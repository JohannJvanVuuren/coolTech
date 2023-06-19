/**
 *  Import and configuration of dotenv to access variable stored in the .env file
 */
import dotenv from 'dotenv';

dotenv.config({path: './config/config.env'});

/**
 * Dependency modules, files and functions
 */
import jwt from 'jsonwebtoken';
import {findOrganisationalUnitName} from "./helpers.js";
import {findDivisionName} from "./helpers.js";

/**
 * Import the models needed in this group of controllers
 */
import User from '../models/user.js';
import division from "../models/division.js";

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

export const getUserOuDiv = async (req, res) => {

    /* Obtaining the token payload from the headers */
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    /* Acquiring the email from the body of the request */
    const email = req.body.email;

    /* Try-catch block in case of JWT verification failure*/
    try {

        /* Verification and decoding of the JWT token */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        /* Obtaining the user information from the database collection */
        if (decoded.admin === true) {

            /* Finding the user's details and organisational unit and division arrays*/
            const user = await User.find({email: email});

            const divisionCodes = user[0].divisionCode;
            const organisationalUnitCodes = user[0].organisationalUnitCode;

            /* Constructing arrays of the organisational unit and division names */
            const divisionNamesArray = [];
            const organisationalUnitNamesArray =[];

            for (const division of divisionCodes) {
                const divisionName = await findDivisionName(division);
                divisionNamesArray.push(divisionName);
            }

            for (const unit of organisationalUnitCodes) {
                const organisationalUnitName = await findOrganisationalUnitName(unit)
                organisationalUnitNamesArray.push(organisationalUnitName);
            }



            const userOuDiv = [divisionNamesArray, organisationalUnitNamesArray]

            res.status(200).send(userOuDiv);
        } else {

            /* An error message if the user is not authorised to view any repositories (fall back) */
            res.status(403).send({'message': 'JWT verified, but not authorized'})

        }

    } catch (err) {

        /* Error message when the JWT verification fails */
        res.status(401).send({'error': 'Bad JWT!'})

    }

}

// TODO: Add 'assign users to OU/Div' endpoint
export const reassignUsers = async (req, res) => {

    /* Obtaining the token payload from the headers */
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];

    /* Obtaining the values in the body of the request by object destructuring */
    const {email, organisationalUnitCode, divisionCode} = req.body;

    /* Try-catch block in case of JWT verification failures */
    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        /* Verifying authorisation to perform this action from the JWT token */
        if (decoded.admin === true) {

            /* Submitting the update via the Mongoose findOneAndUpdate method */
            const user = await User.findOneAndUpdate(
                {
                    email: email
                },
                {
                    $set:{
                        organisationalUnitCode: organisationalUnitCode,
                        divisionCode: divisionCode
                    }
                },
                {
                    new: true,
                    lean: true
                }).exec();

            /* Checking if the update was successful */
            if (user) {
                res.status(200).send({'message': 'Update Successful'});
            } else {
                console.log('Error!!!')
            }

        } else {

            /* An error message if the user is not authorised to view any repositories (fall back) */
            res.status(403).send({'message': 'JWT verified, but not authorized'})

        }

    } catch (err) {

        /* Error message when the JWT verification fails */
        res.status(401).send({'error': 'Bad JWT!'})

    }

}


