/**
 * Dependency modules and hooks
 */
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Import of components needed in this module
 */
import {Header} from "./Header";
import {NavigationBar} from "./NavigationBar";

/**
 * Import of the main stylesheet generated by the SCSS files and preprocessor
 */
import '../scss/main.css';

/**
 * Import of React Bootstrap components
 */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/**
 * Definition of the registration form component that will form the frontend
 * of new user registrations
 */
export const ChangeUserRole = () => {

    /**
     * Use navigate is used to go to the login page when a user clicks on the continued button after
     * registration
     */
    const navigate = useNavigate();

    /* Declaration and initialisation of all state variables */
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    /**
     * Get the user's role
     */
    const getUserFormHandler = (event) => {

        event.preventDefault();

        /* Acquiring the JWT token from local storage */
        const token = localStorage.getItem('JWT token');

        /* Setup of the axios configuration */
        const apiUrl = 'http://localhost:8000/api/get-user';
        const config = {
            email: email
        }
        const headers = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        /* Axios call to get the selected user's current role */
        axios.post(apiUrl, config, headers)
            .then(response => {
                setSelectedRole(response.data[2])
                setIsUserLoaded(true);
            })
            .catch(error => {
                /* Divert to a user feedback error upon the triggering of an error */
                navigate('/userFeedback', {
                    replace: true,
                    state: {
                        status: error.request.status,
                        message: error.request.statusText
                    }
                })
            })
    }

    /**
     * All actions required upon form submission are handled in this function, including
     * the API call to the backend
     */
    const formSubmitHandler = async (event) => {

        event.preventDefault();

        /*
         * Using a conditional statement to determine the new role of the user which will be sent to the
         * backend with an axios call
         */

        let role;

        if (selectedRole === 'normal') {
            role = {normal: true, management: false, admin: false};
        } else if (selectedRole === 'management') {
            role = {normal: false, management: true, admin: false};
        } else {
            role = {normal: false, management: false, admin: true};
        }

        /* Setting up the configuration for the axios call */
        const token = localStorage.getItem('JWT token');
        const url = 'http://localhost:8000/api/user-role';
        const config = {
            email: email,
            newRole: role
        }
        const headers = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        /* The axios post request to the backend */
        await axios.post(url, config, headers)
            .then(response => {
                /* Navigation to the 'reassign user' feedback page for user feedback */
                navigate('/userFeedback', {
                    replace: true,
                    state: {
                        status: response.status,
                        message: response.data.message
                    }
                });
            })
            .catch(error => {
                /* Divert to a user feedback page upon receipt of an error */
                navigate('/userFeedback', {
                    replace: true,
                    state: {
                        status: error.request.status,
                        message: error.request.message
                    }
                });
            })
    }

    /**
     * Rendering of the form with the help of the React Bootstrap Form component
     */
    return (
        <div>
            <Header/>
            <NavigationBar/>
            <div className={'change-role-wrapper'}>
                {/* The React Bootstrap form component and children for the rendering of the form */}
                <Form className={'change-role-email'} onSubmit={getUserFormHandler}>
                    <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
                        <Form.Label className={'h2'}>Get User</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <div>
                        <Button
                            variant="primary"
                            type="submit"
                            className={'form-buttons'}
                        >
                            Get User
                        </Button>
                    </div>
                </Form>
                {isUserLoaded &&
                    <div>
                        <div className={'current-role'}>
                            <h2>Current Role:</h2>
                            <div>
                                {selectedRole.admin ? <p>Admin</p> : selectedRole.management ?
                                    <p>Management</p> : <p>Admin</p>}
                            </div>

                            <h2 className={'update'}>Please set the new authorisations:</h2>
                        </div>
                        <Form className={'change-role-form'} onSubmit={formSubmitHandler}>
                            {/* A Array.prototype.map method was used to loop through and list the respective units. The
                                         same technique is used below when listing the divisions */}
                            <Form.Group className={'mb-3 form-group'} controlId={'formBasicSelect'}>
                                <Form.Label className={'h2'}>New Role</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={selectedRole}
                                    name={'role'}
                                    id={'role'}
                                    onChange={(event) => {
                                        setSelectedRole(event.target.value)
                                    }
                                    }
                                >
                                    <option>Open this select menu</option>
                                    <option value="normal">Normal</option>
                                    <option value="management">Management</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </Form.Group>
                            <div>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={'form-buttons'}
                                >
                                    Update
                                </Button>
                            </div>
                        </Form>
                    </div>
                }
            </div>
        </div>
    )
}