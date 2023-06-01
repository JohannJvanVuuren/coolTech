/**
 * Creation of the schema and model for the credentialRepos collection
 */

/* Import of the Mongoose dependency */
import mongoose from 'mongoose';

/* Instantiation of Schema */
const { Schema } = mongoose;

/* Defining the schema */
const credentialRepositorySchema = new Schema({
    organisationalCode: {
        type: String,
        required: true
    },
    divisionCode: {
        type: String,
        required: true
    },
    resource: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

/* Creation of the users model based on the schema above */
const CredentialRepository = mongoose.model('CredentialRepository', credentialRepositorySchema);

export default CredentialRepository;