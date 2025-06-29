// Modules
import axios from "axios";

// Client URL Domain
import { DOMAIN_URL_CLIENT, DOMAIN_URL_SERVER } from "../config";


// Axios interceptor for handling server error 401 and refresh user token
export default async function refreshAuthUser(){
    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            // If error 401 comes from refreshUserToken route, dont retry request
            if ( originalRequest.url.includes( DOMAIN_URL_SERVER + "/Auth/refreshUserToken" ) || originalRequest._retry ) {
                // If error, redirect to Login 
                window.location.href = DOMAIN_URL_CLIENT + "/login";
                return Promise.reject(error);
            }
            
            if (error?.response?.status === 401 && !originalRequest._retry) { // Catch error 401 from an axios request error made to the api
                originalRequest._retry = true;

                try {
                    const refreshResponse = await axios.post(DOMAIN_URL_SERVER + "/Auth/refreshUserToken", {}, { // Refresh Acces Token
                        withCredentials: true
                    });

                    if (refreshResponse.status === 200) {
                        return axios(originalRequest); // Retry original request after refresh
                    }
                } catch { // If error, redirect to Login 
                    window.location.href = DOMAIN_URL_CLIENT + "/login";
                }
            }
            return Promise.reject(error);
        }
    );
}
