/**
 * Dependency modules
 */
import express from 'express';
import {logInUser} from "../controllers/user.js";
import {registerUser} from "../controllers/user.js";
import {assignUsers} from "../controllers/user.js";

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
 * Creation of the 'assign user to organisational units or divisions' endpoint
 */
router.post('/assign-user', assignUsers);


export default router;
