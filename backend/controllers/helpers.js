/**
 * Import of the models needed in this file
 */
import OrganisationalUnit from '../models/organisationalUnit.js';
import Division from "../models/division.js"

/**
 * A function to obtain the organisational unit and division names from the codes submitted. This function
 * will be used in the proper controllers wherever this functionality is needed.
 */
export const findUnitDivisionNames = async (organisationalCode, divisionCode) => {


    const organisationalUnitQuery = await OrganisationalUnit.find({
        organisationalUnitCode: organisationalCode
    })
    const organisationalUnitName = organisationalUnitQuery[0].unitName;

    const divisionQuery = await Division.find({
        divisionCode: divisionCode
    })
    const divisionName = divisionQuery[0].divisionName;

    /*
     * Creation of an array that will be returned from this function and destructured in the functions
     * where it is needed
     */
    const unitDivisionNamesArray = [organisationalUnitName, divisionName];

    return unitDivisionNamesArray;

}