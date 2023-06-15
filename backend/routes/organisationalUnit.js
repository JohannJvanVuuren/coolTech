/**
 * Dependency modules, files and functions
 */
import express from 'express';
import {getOrganisationalUnitList} from '../controllers/organisationalUnit.js';
import {getAuthorisedOrganisationalUnits} from '../controllers/organisationalUnit.js';

/**
 * Instantiation of a Router object
 */
const router = express.Router();

/**
 * Creation of a get organisational units endpoint
 */
router.get('/organisational-units', getOrganisationalUnitList);

/**
 * Creation of a 'get authorised organisational units' endpoint
 */
router.get('/organisational-units/authorised', getAuthorisedOrganisationalUnits);

export default router;