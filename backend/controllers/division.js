/**
 * Import of the models needed by these controllers
 */
import Division from '../models/division.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

/**
 * This controller facilitates the extraction of the Divisions from the collection in the database
 */
export const getDivisionList = async (req, res) => {

    try {

        /* Extraction of the divisions from the collection in the database */
        const divisions = await Division.find({});
        res.status(200).send(divisions);

    } catch (err) {

        res.status(500).send({'error': 'There was an error while retrieving the list of divisions from ' +
        'the database.'})

    }

}

export const getAuthorisedDivisions = async (req, res) => {

    /* Obtaining the token payload from the headers */
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

        res.status(200).send(divisionDocumentArray);

    } catch (error) {
        /* The final catch block that handles JWT verification failure */
        res.status(401).send({'error': 'Bad JWT!'});
    }
}

