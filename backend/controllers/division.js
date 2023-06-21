/**
 * Import of dependency modules, files, and functions
 */
import {handleJWTtoken} from "./helpers.js";

/**
 * Import of the models needed by these controllers
 */
import Division from '../models/division.js';
import User from '../models/user.js';

/**
 * This controller facilitates the extraction of the Divisions from the collection in the database
 */
export const getDivisionList = async (req, res) => {

    /* Try-catch block in case retrieval of divisions fail */
    try {

        /* Extraction of the divisions from the collection in the database */
        const divisions = await Division.find({});

        /* Testing to see if a division list was found and if so sending a success message */
        if (divisions) {
            res.status(200).send(divisions);
        }

    } catch (err) {

        /* Error message in case the above fails */
        res.status(500).send({'error': 'There was an error while retrieving the list of divisions from ' +
        'the database.'})

    }

}

/**
 * A controller to acquire the user's authorised divisions
 */
export const getAuthorisedDivisions = async (req, res) => {

    /* A try-catch block in cases of JWT verification failure */
    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = handleJWTtoken(req.headers.authorization);

        /* Finding the user to get authorised organisational unit and division codes */
        const user = await User.find({email: decoded.email});

        /* An array to store division objects to be sent back to the frontend */
        const divisionDocumentArray = [];

        /* Creating an array of division objects to send back to the frontend  */
        const divisionCodes = user[0].divisionCode;
        for (const code of divisionCodes) {
            const division = await Division.find({divisionCode: code})
            divisionDocumentArray.push(division[0])
        }

        /* Sending the division array back to the frontend */
        res.status(200).send(divisionDocumentArray);

    } catch (error) {

        /* The final catch block that handles JWT verification failure */
        res.status(401).send({'error': 'Bad JWT!'});

    }
}

