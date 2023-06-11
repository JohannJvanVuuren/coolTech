/**
 * Dependency module, files, and function
 */
import express from 'express';
import {getCredentialRepos} from "../controllers/credentialRepo.js";
import {addCredentials} from "../controllers/credentialRepo.js";

/**
 * Instantiation of a Router object
 */
const router = express.Router();

/**
 * Creation of an endpoint to view credential repos
 */
router.get('/view-credentials', getCredentialRepos);

/**
 * Creation of an 'add credentials to repo' endpoint
 */
router.post('/add-credentials', addCredentials);

export default router;
