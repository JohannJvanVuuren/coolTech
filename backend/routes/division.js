/**
 * Dependency modules, files and functions
 */
import express from 'express';
import {getDivisionList} from "../controllers/division.js";

/**
 * Instantiation of a Router object
 */
const router = express.Router();

/**
 * Creation of a get divisions endpoint
 */
router.get('/divisions', getDivisionList);

export default router;
