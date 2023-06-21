/**
 * Dependency modules, files and functions
 */
import jwt from 'jsonwebtoken';
import {handleJWTtoken} from "./helpers.js";

/**
 * Import of the models needed by these controllers
 */
import OrganisationalUnit from '../models/organisationalUnit.js';
import User from '../models/user.js';

/**
 * The list of organisational units will be extracted from the collection in the database by this
 * controller linked to the get '/organisational-units' endpoint
 */
export const getOrganisationalUnitList = async (req, res) => {

    /* Try-catch block to handle successful retrieval of a unit list from the database collection */
    try {

        /* Getting the list of organisational units from the database using Mongoose */
        const organisationalUnits = await OrganisationalUnit.find({});

        /* Confirming that the list was found before sending it back to the frontend */
        if (organisationalUnits) {
            res.status(200).send(organisationalUnits);
        }

    } catch (error) {

        /* The error message if the above fails */
        res.status(500).send({'error': 'There was an error while retrieving the list of organisational units ' +
                'from the database.'})

    }

}

export const getAuthorisedOrganisationalUnits = async (req, res) => {

    /* Try-catch block in case of JWT verification failure */
    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = handleJWTtoken(req.headers.authorization);

        /* Finding the user to get authorised organisational unit and division codes */
        const user = await User.find({email: decoded.email});

        /* An array to store the organisational unit objects to be sent to the frontend */
        const organisationalUnitArray = [];

        /* Creating an array of organisational unit objects to send back to the frontend */
        const organisationalUnitCodes = user[0].organisationalUnitCode;
        for (const unitCode of organisationalUnitCodes) {
            const organisationalUnit = await OrganisationalUnit.find({
                organisationalUnitCode: unitCode
            })

            organisationalUnitArray.push(organisationalUnit[0]);
        }

        /* Sending the unit array back to the frontend */
        res.status(200).send(organisationalUnitArray);

    } catch (error) {

        /* The final catch block that handles JWT verification failure */
        res.status(401).send({'error': 'Bad JWT!'});

    }
}

