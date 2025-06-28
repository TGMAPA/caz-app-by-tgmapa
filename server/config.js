// Variables to import form a .env file preDeploy!!!!!!!!!!

// Env Variables Module Reader
import dotenv from 'dotenv';
dotenv.config();

export const PORT = 3000;
export const SECRET_JWT_KEY = "$2b$10$97t1SwBwkDRY9nuZhzmQ-RrbSUfpzPlKzQbBS9fxmrS0G9HGhTs2"; // THIS SECRET HAS TO BE IMPORTED FROM ENV -- SECURITY!!
export const SESSION_EXPIRATION_TIME = '1h';
export const NODE_ENV = 'production';



