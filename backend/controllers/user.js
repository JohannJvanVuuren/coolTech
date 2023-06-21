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
import {handleJWTtoken} from "./helpers.js";

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
                res.status(200).send({
                    'token': token,
                    'message': 'Successfully Logged In'
                });

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
            res.status(500).send({'error': 'There was an error while registering the user.'});
        }
    }
}

/**
 * A controller to get the user organisational unit name and division name arrays as well as the
 * role
 */
export const getUser = async (req, res) => {

    /* Acquiring the email from the body of the request */
    const email = req.body.email;

    /* Try-catch block in case of JWT verification failure*/
    try {

        /* Verification and decoding of the JWT token */
        const decoded = handleJWTtoken(req.headers.authorization);

        /* Obtaining the user information from the database collection */
        if (decoded.admin === true) {

            /* Finding the user's details and organisational unit and division arrays*/
            const user = await User.find({email: email});

            /* Extracting the unit and division codes and role */
            const divisionCodes = user[0].divisionCode;
            const organisationalUnitCodes = user[0].organisationalUnitCode;
            const role = user[0].role;

            /* Constructing arrays of the organisational unit and division names */
            const divisionNamesArray = [];
            const organisationalUnitNamesArray =[];

            /* Using a helper function to transform the codes into division names */
            for (const division of divisionCodes) {
                const divisionName = await findDivisionName(division);
                divisionNamesArray.push(divisionName);
            }

            /* Using a helper function to transform the codes into organisational unit names */
            for (const unit of organisationalUnitCodes) {
                const organisationalUnitName = await findOrganisationalUnitName(unit)
                organisationalUnitNamesArray.push(organisationalUnitName);
            }

            /* Constructing an array of the above information to send to the frontend */
            const userOuDiv = [divisionNamesArray, organisationalUnitNamesArray, role]

            /* Sending the information to the frontend */
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

export const reassignUsers = async (req, res) => {

    /* Obtaining the values in the body of the request by object destructuring */
    const {email, organisationalUnitCode, divisionCode} = req.body;

    /* Try-catch block in case of JWT verification failures */
    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = handleJWTtoken(req.headers.authorization);

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
                res.status(500).send({'error': 'Internal server or database error while reassigning user'})
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

/**
 * Change user's role
 */
export const changeUserRole = async (req, res) => {

    /* Obtaining the required data from the body of the request by object destructuring */
    const {email, newRole} = req.body;

    /* Try-catch block in case of JWT verification failures */
    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = handleJWTtoken(req.headers.authorization);

        /* Verifying authorisation to perform this action from the JWT token */
        if (decoded.admin === true) {

            /* Submitting the update via the Mongoose findOneAndUpdate method */
            const updatedDocument = await User.findOneAndUpdate(
                {
                    email: email
                },{
                    $set: {
                        role: newRole
                    }
                },
                {
                    new: true,
                    lean: true
                }).exec();

            /* Confirming that the document was indeed updated */
            if (updatedDocument) {

                /* Returning a success message to the frontend if update was confirmed */
                res.status(200).send({'message': 'Update successful'})

            } else {

                /* Returning an error code and message if not confirmed */
                res.status(500).send({'error': 'Internal server or database error while updating role'})
            }

        } else {

            /* An error message if the user is not authorised to view any repositories (fall back) */
            res.status(403).send({'message': 'JWT verified, but not authorized'})

        }

    } catch (err){

        /* Error message when the JWT verification fails */
        res.status(401).send({'error': 'Bad JWT!'})

    }

}