/**
 * Creation of the schema and model for the organisationalUnit collection
 */

/* Import of the Mongoose dependency */
import mongoose from 'mongoose';

/* Instantiation of Schema */
const { Schema } = mongoose;

/* Defining the schema */
const organisationalUnitsSchema = new Schema({
    organisationalUnitCode: {
        type: String,
        required: true
    },
    unitName: {
        type: String,
        required: true
    }
})

/* Creation of the users model based on the schema above */
const OrganisationalUnit = mongoose.model('OrganisationalUnit', organisationalUnitsSchema);

export default OrganisationalUnit;