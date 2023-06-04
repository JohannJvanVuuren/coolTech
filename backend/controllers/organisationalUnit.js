/**
 * Import of the models needed by these controllers
 */
import OrganisationalUnit from "../models/organisationalUnit.js";

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