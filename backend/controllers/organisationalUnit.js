/**
 * Dependency modules, files and functions
 */
import jwt from 'jsonwebtoken';

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

    try {

        /* Getting the list of organisational units from the database using Mongoose */
        const organisationalUnits = await OrganisationalUnit.find({});
        res.status(200).send(organisationalUnits);

    } catch (error) {

        res.status(500).send({'error': 'There was an error while retrieving the list of organisational units ' +
                'from the database.'})

    }

}

export const getAuthorisedOrganisationalUnits = async (req, res) => {

    /* Obtaining the token payload from the headers */
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    try {

        /* Verifying and decoding the payload with the secret code */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

        res.status(200).send(organisationalUnitArray);

    } catch (error) {
        /* The final catch block that handles JWT verification failure */
        res.status(401).send({'error': 'Bad JWT!'});
    }
}

