/**
 * Creation of the schema and model for the divisions collection
 */

/* Import of the Mongoose dependency */
import mongoose from 'mongoose';

/* Instantiation of Schema */
const { Schema } = mongoose;

/* Defining the schema */
const divisionsSchema = new Schema({
    divisionCode: {
        type: String,
        required: true
    },
    divisionName: {
        type: String,
        required: true
    }
})

/* Creation of the users model based on the schema above */
const Division = mongoose.model('Division', divisionsSchema);

export default Division;