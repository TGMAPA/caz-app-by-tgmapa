// Modules
import express from 'express';

// Env Variables
import {PORT} from './env_vars.js';

// Routes
import usersRoutes from './routes/users.routes.js';



// Server instance
const app = express();


// ======== API Endpoints ======== /

// Root Endpoint
app.get('/', (req, res) => {
    res.json(
        {
            message: 'HolaMundo'
        }
    )
})

app.get('/getusers', (req, res) => {
    
})

app.post('/login', (req, res) => {

})

app.post('/logout', (req, res) => {
    
})

app.post('/signin', (req, res) => {
    
})

// ======== API Endpoints ======== \


// Server Port Configuration
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT + '...');
})