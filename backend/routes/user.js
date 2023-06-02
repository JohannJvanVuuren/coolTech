/**
 * Dependency modules
 */
import express from 'express';
import {logInUser} from "../controllers/user.js";

/**
 * Instantiation of a rRouter object
 * @type {Router}
 */
const router = express.Router();


/**
 * Creation of a log in endpoint.
 */
router.post('/login', logInUser);


export default router;
