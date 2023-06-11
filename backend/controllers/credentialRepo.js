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
 * Import of models needed in this controller
 */
import User from '../models/user.js';
import OrganisationalUnit from '../models/organisationalUnit.js';
import Division from '../models/division.js';
import CredentialRepo from '../models/credentialRepo.js';

/**
 * Controller to get credential repos that user is authorized to view from the database
 */
export const getCredentialRepos = async (req, res) => {

    /* Obtaining the token payload from the headers */
    // const token = req.headers.authorization.split(' ')[1];
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

                    const organisationalUnitQuery = await OrganisationalUnit.find({
                        organisationalUnitCode: resource.organisationalCode
                    })
                    const organisationalUnitName = organisationalUnitQuery[0].unitName;

                    const divisionQuery = await Division.find({
                        divisionCode: resource.divisionCode
                    })
                    const divisionName = divisionQuery[0].divisionName;

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