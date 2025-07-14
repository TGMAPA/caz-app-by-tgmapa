// Modules
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'; // JWT tokens for sessions

// Env Variables
import { PORT, SECRET_JWT_KEY } from './config.js';

// Routes
import userDataRoutes from './routes/userdata.routes.js';
import systemUserRoutes from './routes/systemuser.routes.js';
import authRoutes from './routes/auth.routes.js';

// Controllers
import { getPositionEndpoints } from './controllers/userPositionsEndpoints.controller.js';
import { refreshUserToken } from './controllers/auth.controller.js';

// Tools
import Validation from './tools/Validation.js';

// Redis Controller
import { RedisHandler } from './tools/RedisHandler.js';



// Server instance
const app = express();

// Trust in Nginx
app.set('trust proxy', true);

// Json proccessing in requests
app.use(express.json());

// Cookie handler
app.use(cookieParser());

// Cors Policy
const corsOptions = {
    origin : ["http://localhost:5173"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true
};
app.use(cors(corsOptions));

const API_DOMAIN_ROOT = "/api";



// ======== API Endpoints ======== /

app.use(async (req, res, next) => {
    // Public Routes
    const publicPaths = [
        API_DOMAIN_ROOT + "/Auth/authUser",
        API_DOMAIN_ROOT + "/Auth/refreshUserToken",

        // Test Public Routes
    ];

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // Requestor IP

    const access_token = req.cookies.access_token;  // Access to token inside Cookie
    const refresh_token = req.cookies.refresh_token;  // Access to token inside Cookie

    req.session = { currentUser: null }; // Initialize data session to null  req.session is accesible from any route
    req.refreshSession = { currentUser: null } // Initialize data Refresh session to null  req.refreshSession is accesible from any route

    console.log("\n");
    console.log("Server Request to :'",req.path,"'");
    console.log("Requestor IP      : ",ip);

    try{
        const refreshData = jwt.verify(refresh_token, SECRET_JWT_KEY);   // Verify Refresh Token
        req.refreshSession.currentUser = refreshData;          // Get currentUser Session Data inside jwt (Includes id, userid, username, personalEmail and position) This can be accessed from anywhere in server routes
        
        // If access_token isnt available, refresh it
        if(access_token == undefined){
            refreshUserToken(req, res); // Refresh token
            console.log("El usuario ha sido nuevamente autenticado.")
            return;  // --User may have to retry the requested endpoint--
        }
        
        const data = jwt.verify(access_token, SECRET_JWT_KEY);   // Verify Access Token
        req.session.currentUser = data;             // Get currentUser Session Data inside jwt (Includes id, userid, username, personalEmail and position) This can be accessed from anywhere in server routes
        console.log("- From Current User: ", req.session.currentUser); // Show current user

        // -- Access Verification by its SystemUserPosition and PositionPrivileges
        console.log(await RedisHandler.getCachedValue('positionsEndpoints'));
        

        // IF not in redis = Get endpoints
        const [status, position_endpoints] = await getPositionEndpoints(req.session.currentUser.position);
        
        if(!status){ // Operation not successfull
            res.status(403).json({ error: "Hubo un problema al autenitcar al usuario." });
            return; 
        }
        
        // Endpoints allowed for currentUser
        const allowedPaths = publicPaths.concat(position_endpoints);

        // If requested path isnt allowd for currentUser then show error 401
        if(!allowedPaths.includes(req.path)){
            res.status(401).json({ error: "Usuario No Autorizado." });
            return;
        }

    } catch {
        // If current Path is Public, let the middleware go on
        if (publicPaths.includes(req.path)) {
            return next();
        }
        
        console.error("- From Current User: Usuario no Autorizado");
        res.status(401).json({ error: "Usuario No Autorizado." });
        return;
    }
    next(); // Go on to the next route or middleware
})

// Root Endpoint
app.get('/', (req, res) => {
    res.json(
        {
            message: 'HolaMundo'
        }
    )
})

app.get('/protected', async (req, res) => {  // Example Potected Route

  if(!await Validation.VerifyUserPrivilege( req.session.currentUser, [ 'Admin' ], res )){ return } // Restrict Users by their position and session existence 
  
  res.json({
    message: "Bienvenido al panel de administrador",
    currentUser: req.session.currentUser,
  });

})

// UserData Routes
app.use(API_DOMAIN_ROOT + '/UserData', userDataRoutes); 

// SystemUsers Routes
app.use(API_DOMAIN_ROOT + '/SystemUsers', systemUserRoutes); 

// SystemUsers Routes
app.use(API_DOMAIN_ROOT + '/Auth', authRoutes); 

// ======== API Endpoints ======== \


// Server Port Configuration
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT + '...');
})