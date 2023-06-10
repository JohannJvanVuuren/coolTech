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

            const user = await User.find({email: decoded.email})
            const userOrganisationalUnitCodes = user[0].organisationalUnitCode;
            const userDivisionCodes = user[0].divisionCode;
            const userOrganisationalUnitCredentials = [];
            const userDivisionCredentialArray = [];
            const userDiscreteCredentialsFrontendArray = []

            for (const unitCode of userOrganisationalUnitCodes) {
                for (const division of userDivisionCodes) {
                    const userCredentialAccess = await CredentialRepo.find({
                        organisationalCode: unitCode,
                        divisionCode: division
                    })
                    userDivisionCredentialArray.push(userCredentialAccess);
                }
                userOrganisationalUnitCredentials.push(userDivisionCredentialArray);
            }

            for (const organisationalUnitRepo of userOrganisationalUnitCredentials) {
                for (const divisionRepo of organisationalUnitRepo) {
                    const index = organisationalUnitRepo.indexOf(divisionRepo);
                    const organisationalUnit = await OrganisationalUnit.find({
                        organisationalUnitCode: divisionRepo[index].organisationalCode
                    })
                    const organisationalUnitName = organisationalUnit[0].unitName;
                    const division = await Division.find({
                        divisionCode: divisionRepo[index].divisionCode
                    })
                    const divisionName = division[0].divisionName;
                    const credentialDiscreteObject = {
                        organisationalUnitName: organisationalUnitName,
                        divisionName: divisionName,
                        resource: divisionRepo[index].resource,
                        username: divisionRepo[index].username,
                        password: divisionRepo[index].password
                    }
                    userDiscreteCredentialsFrontendArray.push(credentialDiscreteObject);
                }
            }


            res.status(200).send(userDiscreteCredentialsFrontendArray);
        } else {
            res.status(403).send({'message': 'JWT verified, but not authorized'})
        }
    } catch (error) {

        res.status(401).send({'error': 'Bad JWT!'});

    }
}