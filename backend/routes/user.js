/**
 * Dependency modules
 */
import express from 'express';
import {logInUser} from "../controllers/user.js";
import {registerUser} from "../controllers/user.js";
import {reassignUsers} from "../controllers/user.js";
import {getUser} from "../controllers/user.js";
import {changeUserRole} from "../controllers/user.js";

/**
 * Instantiation of a rRouter object
 * @type {Router}
 */
const router = express.Router();

/**
 * Creation of a log in endpoint.
 */
router.post('/login', logInUser);

/**
 * Creation of a registration endpoint
 */
router.post('/registration', registerUser);

/**
 * Creation of a 'get user' endpoint
 */
router.post('/get-user', getUser);

/**
 * Creation of the 'assign user to organisational units or divisions' endpoint
 */
router.post('/reassign-user',reassignUsers);

/**
 * Endpoint to update a user's role
 */
router.post('/user-role', changeUserRole);

export default router;
