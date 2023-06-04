/**
 * Import of the models needed by these controllers
 */
import Division from '../models/division.js';

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