/**
 * Import of dependency modules
 */
import jwt from 'jsonwebtoken';

/**
 * Import of the models needed in this file
 */
import OrganisationalUnit from '../models/organisationalUnit.js';
import Division from "../models/division.js"

/**
 * Function to handle the JWT token verification that is used regularly on the backend
 */
export const handleJWTtoken = (JWTtoken) => {

    /* Obtaining the token payload from the headers */
    const auth = JWTtoken;
    const token = auth.split(' ')[1];

    /* Verifying and decoding the payload with the secret code */
    return jwt.verify(token, process.env.JWT_SECRET);

}

/**
 * A function to obtain the organisational unit and division names from the codes submitted. This function
 * will be used in the proper controllers wherever this functionality is needed.
 */
export const findUnitDivisionNames = async (organisationalCode, divisionCode) => {

    /*
     * Finding the particular organisational unit array and extracting the name from the
     * object within the array
     */
    const organisationalUnitQuery = await OrganisationalUnit.find({
        organisationalUnitCode: organisationalCode
    })
    const organisationalUnitName = organisationalUnitQuery[0].unitName;

    /*
     * Finding the particular division array and extracting the name from the
     * object within the array
     */
    const divisionQuery = await Division.find({
        divisionCode: divisionCode
    })
    const divisionName = divisionQuery[0].divisionName;

    /*
     * Creation of an array that will be returned from this function and destructured in the functions
     * where it is needed
     */
    return [organisationalUnitName, divisionName];

}

/**
 * Finding the individual organisational unit name on its own using the unit code
 */
export const findOrganisationalUnitName = async (organisationalCode) =>{

    /* Same logic as above, but isolated to organisational unit alone*/
    const organisationalUnitQuery = await OrganisationalUnit.find({
        organisationalUnitCode: organisationalCode
    })

    return organisationalUnitQuery[0].unitName

}

/**
 * Finding the individual division name on its own using the division code
 */
export const findDivisionName = async (divisionCode) =>{

    /* Same logic as above, but isolated to division alone*/
    const divisionQuery = await Division.find({
        divisionCode: divisionCode
    })

    return divisionQuery[0].divisionName;

}