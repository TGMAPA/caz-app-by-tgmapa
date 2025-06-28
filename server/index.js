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

// Tools
import Validation from './tools/Validation.js';



// Server instance
const app = express();

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

app.use((req, res, next) => {
    const token = req.cookies.access_token;  // Access to token inside Cookie

    req.session = { currentUser: null }; // Initialize data session to null  req.session is accesible from any route
    
    try{
        let data = null;
        data = jwt.verify(token, SECRET_JWT_KEY);
        req.session.currentUser = data; // Get currentUser Session Data inside jwt (Includes id, userid, username, personalEmail and position)
        console.log("Current User: ", req.session.currentUser);
    } catch {}
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