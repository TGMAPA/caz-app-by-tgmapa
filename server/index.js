// Modules
import express from 'express';

// Env Variables
import {PORT} from './env_vars.js';

// Routes
import usersRoutes from './routes/users.routes.js';



// Server instance
const app = express();

// Json proccessing in requests
app.use(express.json())

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


app.use(API_DOMAIN_ROOT + '/user', usersRoutes); // Users Routes

// ======== API Endpoints ======== \


// Server Port Configuration
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT + '...');
})