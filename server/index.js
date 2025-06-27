// Modules
import express from 'express';

// Env Variables
import { PORT } from './env_vars.js';

// Routes
import userDataRoutes from './routes/userdata.routes.js';
import systemUserRoutes from './routes/systemuser.routes.js';
import authRoutes from './routes/auth.routes.js';



// Server instance
const app = express();

// Json proccessing in requests
app.use(express.json());

const API_DOMAIN_ROOT = "/api";

// ======== API Endpoints ======== /

// Root Endpoint
app.get('/', (req, res) => {
    res.json(
        {
            message: 'HolaMundo'
        }
    )
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