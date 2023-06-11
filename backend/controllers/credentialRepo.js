/**
 *  Import and configuration of dotenv to access variable stored in the .env file
 */
import dotenv from 'dotenv';

dotenv.config({path: './config/config.env'});

/**
 * Dependency modules, files and functions
 */
import jwt from 'jsonwebtoken';
import {findUnitDivisionNames} from './helpers.js';

/**
 * Import of models needed in this controller
 */
import User from '../models/user.js';
import CredentialRepo from '../models/credentialRepo.js';

/**
 * Controller to get credential repos that user is authorized to view from the database
 */
export const getCredentialRepos = async (req, res) => {

    /* Obtaining the token payload from the headers */
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        /* Checking the level of access corresponding to the payload */
        if (decoded.normal === true || decoded.management === true || decoded.admin === true) {

            /**
             * Acquiring the user from the database in order to get the organisational unit codes and corresponding
             * division codes for which the user is authorised to view credential repos.
             */
            const user = await User.find({email: decoded.email})
            const userOrganisationalUnitCodes = user[0].organisationalUnitCode;
            const userDivisionCodes = user[0].divisionCode;

            /**
             * Declaring and initialising arrays for processing the data and also the third one for sending
             * the credential repo information back to the frontend
             */
            const userDivisionCredentialArray = [];
            const userDiscreteCredentialsFrontendArray = []

            /**
             * Acquiring the actual credential repos and pushing them first onto a division array and then
             * onto an organisational array to make the processing easier
             */
            for (const unitCode of userOrganisationalUnitCodes) {
                for (const division of userDivisionCodes) {

                    const userCredentialAccess = await CredentialRepo.find({
                        organisationalCode: unitCode,
                        divisionCode: division
                    })

                    userDivisionCredentialArray.push(userCredentialAccess);

                }
            }

            /**
             * Looping through the processing array to find the organisational unit and division names
             * from their codes; then creating a discrete object for each resource linked to the organisational
             * unit and division and pushing each of these objects to an array which can be sent back to the
             * frontend for display
             */
            for (const division of userDivisionCredentialArray) {
                for (const resource of division) {

                    /*
                     * Using the helper function and destructuring of the array returned from it
                     * to obtain the organisational unit and division names
                     */
                    const unitDivisionNamesArray = await findUnitDivisionNames(resource.organisationalCode,
                        resource.divisionCode);
                    console.log(unitDivisionNamesArray)
                    const [organisationalUnitName, divisionName] = unitDivisionNamesArray;

                    /*
                     * Creating a discrete resource object per organisational unit per division which is pushed
                     * to an array which is sent as a response to the frontend
                     */
                    const discreteResourceObject = {
                        organisationalUnitName: organisationalUnitName,
                        divisionName: divisionName,
                        resource: resource.resource,
                        username: resource.username,
                        password: resource.password
                    }

                    userDiscreteCredentialsFrontendArray.push(discreteResourceObject);

                }
            }

            /* Sending a status code with the discrete resources array back to the frontend */
            res.status(200).send(userDiscreteCredentialsFrontendArray);

        } else {

            /* An error message if the user is not authorised to view any repositories (fall back) */
            res.status(403).send({'message': 'JWT verified, but not authorized'})
        }
    } catch (error) {

        /* The final catch block that handles JWT verification failure */
        res.status(401).send({'error': 'Bad JWT!'});

    }
}

export const addCredentials = async (req, res) => {

    /* Acquiring the token payload from the headers */
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    /* Acquiring the new credentials from the body of the request */
    const {resource, username, password} = req.body;

    console.log(resource);

    /* Decoding and verifying the JWT token */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* Checking user authorisation based on the JWT payload */
    if (decoded.normal === true || decoded.management === true || decoded.admin === true) {

        /* Attempting to find the credential in question */
        const newCredential = await CredentialRepo.find({
            resource: resource,
            username: username,
            password: password
        })

        /*
         * If not found a new document is added to the collection, otherwise an error is produced to alert
         * the user that the document already exists
         */
        if (newCredential.length === 0) {

            try {
                const newCredential = new CredentialRepo(req.body);
                await newCredential.save();
                res.status(200).send({'message': 'Credentials Added'})
            } catch (err) {
                res.status(500).send({message: 'There was an error while registering the user.'});
            }

        } else {

            res.status(403).send({'message': 'Credential Already Exists'});

        }
    } else {

        /* An error message if the user is not authorised to view any repositories (fall back) */
        res.status(403).send({'message': 'JWT verified, but not authorized'}).end()

    }

}