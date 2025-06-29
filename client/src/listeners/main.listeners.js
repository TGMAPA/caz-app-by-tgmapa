// Listeners
import refreshAuthUser from './refreshAuthUser.interceptor';

export default async function execListeners(){
    await refreshAuthUser(); // Axios interceptor for handling server error 401 and refresh user token
}