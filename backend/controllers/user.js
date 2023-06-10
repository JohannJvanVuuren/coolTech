/**
 *  Import and configuration of dotenv to access variable stored in the .env file
 */
import dotenv from 'dotenv';

dotenv.config({path: './config/config.env'});

/**
 * Dependency modules
 */
import jwt from 'jsonwebtoken';

/**
 * Import the models needed in this group of controllers
 */
import User from '../models/user.js'
import logger from "morgan";

/**
 * The authentication endpoint controller
 */
export const logInUser = async (req, res) => {

    /* Obtaining the login details from the body of the request with object destructuring */
    const {email, password} = req.body;

    /* Finding the user by searching the user collection via the User model */
    const user = await User.findOne({email: email});

    try {
        /**
         * Checking if the user exist and responding with an error it not. If found, check that the
         * password is correct and if so generating and sending a JWT token.
         */
        if (user === null) {
            res.status(404).send({message: 'No such email found.'});
        } else {
            if (password === user.password) {

                /* Setting the payload of the JWT token */
                const payload = {
                    'email': user.email,
                    'normal': user.role.normal,
                    'management': user.role.management,
                    'admin': user.role.admin
                }

                /* Generating the JWT token and sending it back to the frontend */
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: 'HS256'});
                res.send({'token': token});

                /* Error if password did not match the user */
            } else {
                res.status(403).send({message: 'Incorrect login'});
            }
        }
        /* Catch block for all other errors. */
    } catch (error) {
        res.status(500).send({message: 'Internal Server or Network Error'});
    }

}
/**
 * This is the new user registration endpoint controller
 */
export const registerUser = async (req, res) => {


    /* Obtaining the registration details via object destructuring from the body of the request */
    const {
        email,
        firstName,
        surname,
        role,
        organisationalUnitCode,
        divisionCode,
        password
    } = req.body;

    /* Validating the completion of all required fields */
    if (
        !email || !firstName || !surname || !organisationalUnitCode || !divisionCode || !password) {
        res.status(403).send({message: 'Please complete all fields.'});
    }

    /**
     * Verify that user doesn't already exist and registering the user if not already in the user
     * collection of the database
     */
    const user = await User.findOne({email: email})
    if (user) {
        res.status(403).send({message: 'The email already exists.'});
    } else {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).send({message: 'Registration Successful!'});
        } catch (err) {
            res.status(500).send({message: 'There was an error while registering the user.'});
        }
    }
}