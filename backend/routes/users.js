/**
 * Dependency modules
 */
import express from 'express';

/**
 * Instantiation of a rRouter object
 * @type {Router}
 */
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

export default router;
