/**
 * Creation of the schema and model for the users collection
 */

/* Import of the Mongoose dependency */
import mongoose from 'mongoose';

/* Instantiation of Schema */
const { Schema } = mongoose;

/* Defining the schema */
const usersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    organisationalUnitCode: {
        type: Array,
        required: true
    },
    divisionCode: {
        type: Array,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

/* Creation of the users model based on the schema above */
const User = mongoose.model('User', usersSchema);

export default User;