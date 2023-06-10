/**
 * Dependency modules
 */
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import crypto from 'crypto';
import express from 'express';
import {  fileURLToPath } from 'url';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';

/**
* Import of routes
*/
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import organisationalUnitRouter from './routes/organisationalUnit.js';
import divisionRouter from './routes/division.js';
import credentialRepoRouter from './routes/credentialRepo.js';

/**
 * Instantiation of express
 */
const app = express();

/**
 * View engine setup
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
    '/static',
    express.static(path.join(__dirname, 'public'))
)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Registration of middleware
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(logger('dev'));

/**
 * Registration of route endpoints
 */
app.use('/', indexRouter);
app.use('/api', userRouter);
app.use('/api', organisationalUnitRouter);
app.use('/api', divisionRouter);
app.use('/api', credentialRepoRouter);

/**
 * Setup of the default Helmet settings for the app
 */
const nonce = crypto.randomUUID();
helmet.contentSecurityPolicy({
  directives: {
    "script-src": [`'nonce-${nonce}'`, 'strict-dynamic'],
    "object-src": 'none',
    "base-uri": 'none',
    "Cross-Origin-Resource-Policy": 'cross-origin',
    "Cross-Origin-Opener-Policy": 'cross-origin',
  }
})

/**
 * The catching of 404 errors and forwarding to the error handler below
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * The error handler
 */
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
