/**
 * Dependency modules, files and functions
 */
import express from 'express';
import {getDivisionList} from "../controllers/division.js";
import {getAuthorisedDivisions} from '../controllers/division.js';

/**
 * Instantiation of a Router object
 */
const router = express.Router();

/**
 * Creation of a get divisions endpoint
 */
router.get('/divisions', getDivisionList);

/**
 * Creation of a 'get authorised divisions' endpoint
 */
router.get('/divisions/authorised', getAuthorisedDivisions);

export default router;
