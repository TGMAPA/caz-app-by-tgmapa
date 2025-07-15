// Variables to import form a .env file preDeploy!!!!!!!!!!

// Env Variables Module Reader
import dotenv from 'dotenv';
dotenv.config();

export const PORT = 3000;
export const DOMAIN = "localhost";
export const SECRET_JWT_KEY = "$2b$10$97t1SwBwkDRY9nuZhzmQ-RrbSUfpzPlKzQbBS9fxmrS0G9HGhTs2"; // THIS SECRET HAS TO BE IMPORTED FROM ENV -- SECURITY!!
export const ACCESS_TOKEN_SESSION_EXPIRATION_TIME_STR = '15m';
export const REFRESH_TOKEN_SESSION_EXPIRATION_TIME_STR = '1d';
export const ACCESS_TOKEN_SESSION_EXPIRATION_TIME_INT = 15;  // ACCESS_TOKEN_SESSION_EXPIRATION_TIME_STR expressed as int (minutes)   15
export const REFRESH_TOKEN_SESSION_EXPIRATION_TIME_INT = 10080;  // REFRESH_TOKEN_SESSION_EXPIRATION_TIME_STR expressed as int (minutes)
export const NODE_ENV = 'dev';
export const REDIS_URL = "redis://"+ DOMAIN +":6379"; // Redis Default Url

