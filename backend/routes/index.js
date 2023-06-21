/**
 * Dependency modules
 */
import express from 'express';

/**
 * Instantiation of a rRouter object
 * @type {Router}
 */
const router = express.Router();

/**
 * This is a dummy route that will be used to evaluate the general functioning of the backend during testing. */
router.get('/', function(req, res) {
  res.status(200).send('respond with a resource');
});

export default router;
