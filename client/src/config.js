// Variables to import form a .env file preDeploy!!!!!!!!!!

export const DOMAIN_URL_SERVER = import.meta.env.VITE_API_URL;
export const DOMAIN_URL_CLIENT = 'http://localhost:5173';  // In Dev Mode, must be the same server domain, different port. In Production may be the same SERVER and CLIENT
    
