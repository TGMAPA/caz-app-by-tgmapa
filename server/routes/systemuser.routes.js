// Modules
import express from 'express';

// System User Controller Functions
import { createUser } from '../controllers/UsersAuthService/systemuser.controller.js';
import { createUserPosition } from '../controllers/UsersAuthService/userPositions.controller.js';
import { createUserPrivilege, getAllUsers } from '../controllers/UsersAuthService/userPrivilege.controller.js';
import { relatePositionAndPrivilege, deleteRelationPositionAndPrivilege } from '../controllers/UsersAuthService/UserPositionsPrivileges.controller.js';
import { relatePrivilegesAndEndpoint, deleteRelationPrivilegeAndEndpoint } from '../controllers/UsersAuthService/userPrivilegesEndpoints.controller.js';


// -- Router Instance for routes handling
const router = express.Router();

// =============== User Data Routes

//  -- System Users
// Create User
router.post('/createUser', createUser);



//  -- User Position
// Create User Position
router.post('/createUserPosition', createUserPosition);



//  -- User Privilege --
// Create User Privilege
router.post('/createUserPrivilege', createUserPrivilege);

// Get All User Privilege 
router.post('/getAllUserPrivileges', getAllUsers);



//  -- User Position - Privilege -- 
// Create Relation User Position - Privilege
router.post('/relatePositionAndPrivilege', relatePositionAndPrivilege);

// Delete Relation User Position - Privilege
router.post('/deleteRelationPositionAndPrivilege', deleteRelationPositionAndPrivilege);



//  -- User Privilege - Endpoints --
// Create Relation User Privilege - Endpoint
router.post('/relatePrivilegeAndEndpoint', relatePrivilegesAndEndpoint);

// Delete Relation User Privilege - Endpoint
router.post('/deleteRelationPrivilegeAndEndpoint', deleteRelationPrivilegeAndEndpoint);


// -- User Position - Endpoints --
// Get every endpoint related with any System User position
// router.post('/getPositionEndpoints', );


export default router;