/**
 *  Import and configuration of dotenv to access variable stored in the config.env file
 */
import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'});

/**
 * Import of dependency module
 */
import mongoose from 'mongoose';

/**
 * Debugging library
 */
mongoose.set('debug', true);

/**
 * Setting up the Mongoose connection to the MongoDB database
 */
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;

/**
 * Error or success handling for the Mongoose connection to the MongoDB database
 */
db.on('error', err => console.log('Connection error: ', err));
db.once('open', () => {
    console.log('Connection to the coolTech database successful.');
})

/**
 * Export of the connection for use in bin/www.js.js
 */
export default db