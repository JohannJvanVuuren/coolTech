/* Import of dependency modules and hooks */
import axios from 'axios';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

/* Import of the other components needed */
import {Header} from "./Header";
import {NavigationBar} from "./NavigationBar";

/* Import of the main stylesheet generated by the SCSS files and preprocessor */
import '../scss/main.css'
/* Import of React Bootstrap components */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* Definition of the login page component where user will login with an
* email and password */
export const AddCredentialRepo = () => {

    /* Creation of a 'navigate' instance to enable use of the useNavigate() hook */
    const navigate = useNavigate();

    /* Declaration and initialisation of state variables */
    const [organisationalUnits, setOrganisationalUnits] = useState([]);
    const [organisationalCode, setOrganisationalCode] = useState('');
    const [divisions, setDivisions] = useState([]);
    const [divisionCode, setDivisionCode] = useState('');
    const [resource, setResource] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     *  Retrieval of the JWT token from local storage to use in the get requests to make sure the
     *  user can only add credentials to organisational units and divisions where authorised
     */
    const token = localStorage.getItem('JWT token');

    /* useEffect hook to run once only to obtain authorised organisational units and divisions */
    useEffect(() => {

        /**
         * Two simultaneous axios requests to get the organisational unit and division lists from
         * the database for only authorised units and divisions
         */
        const urlOrgUnits = 'http://localhost:8000/api/organisational-units/authorised';
        const urlDivisions = 'http://localhost:8000/api/divisions/authorised';
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        /* Setting up multiple axios call */
        const requestOrgUnits = axios.get(urlOrgUnits, config);
        const requestDivisions = axios.get(urlDivisions, config);

        /**
         * The axios call and subsequent setting of the organisationalUnits and divisions variables
         */
        axios.all([requestOrgUnits, requestDivisions])
            .then(axios.spread((...responses) => {
                setOrganisationalUnits(responses[0].data);
                setDivisions(responses[1].data);
            }))
            .catch(error => {
                console.log(error);
            });

    }, [divisions.length, organisationalUnits.length, token]);

    /**
     * This function keeps track of which radio button in the organisational unit
     * section was checked.
     */
    const orgUnitCheckboxChangeHandler = (event) => {

        setOrganisationalCode(event.target.value);

    }

    /**
     * This function keeps track of which radio button was checked in the divisions section
     */
    const divisionCheckboxChangeHandler = (event) => {

        setDivisionCode(event.target.value);

    }

    /**
     * This function is responsible for the submission of all information to the backend
     * when the 'add' button is clicked
     */
    const loginFormSubmitHandler = (event) => {

        event.preventDefault();

        /* Setting up the configuration of the axios call to post the added credentials to
         * the database collection */
        const apiUrl = 'http://localhost:8000/api/add-credentials';
        const config = {
            organisationalCode: organisationalCode,
            divisionCode: divisionCode,
            resource: resource,
            username: username,
            password: password
        }
        const headers = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        /* Axios call to add the above information to the database */
        axios.post(apiUrl, config, headers)
            .then(response => {
                /* Navigating to the user feedback page once completed */
                navigate('/userFeedback', {
                    state: {
                        message: response.data.message,
                        status: response.status
                    }
                })
            })
            .catch(error => {
                /* Navigating to the user feedback page upon error */
                navigate('/userFeedback', {
                    state: {
                        status: error.request.status,
                        message: error.response.data.error
                    }
                })
            })
    }

    /* Rendering of the component */
    return (
        <div>
            <Header/>
            <NavigationBar/>
            {/* Use of the React Bootstrap Form component for the rendering of the form */}
            <Form
                className={'add-repo-form'}
                onSubmit={loginFormSubmitHandler}
            >
                <h1 className={'add-repo-form__heading'}>Add credential repo form</h1>
                {/* A Array.prototype.map method was used to loop through and list the respective units. The
                 same technique is used below when listing the divisions */}
                <Form.Group className={'mb-3 form-group'} controlId={'formBasicCheckbox'}>
                    <Form.Label className={'h2'}>Organisational Units</Form.Label>
                    {organisationalUnits.map((unit, index) => {
                        return (
                            <Form.Check
                                type="radio"
                                label={unit.unitName}
                                id={`custom-orgUnit-checkbox-${index}`}
                                key={index}
                                name={'organisationalCode'}
                                value={unit.organisationalUnitCode}
                                /* Setting the checked state to true for a particular value */
                                checked={organisationalCode === unit.organisationalUnitCode}
                                /* See function comments above */
                                onChange={orgUnitCheckboxChangeHandler}
                            />
                        )
                    })}
                </Form.Group>
                <Form.Group className="mb-3 form-group" controlId="formBasicCheckbox">
                    <Form.Label className={'h2'}>Division</Form.Label>
                    {divisions.map((division, index) => {
                        return (
                            <Form.Check
                                type="radio"
                                label={division.divisionName}
                                id={`custom-division-checkbox-${index}`}
                                key={index}
                                name={'divisionCode'}
                                value={division.divisionCode}
                                /* Setting the checked state true for a particular value */
                                checked={divisionCode === division.divisionCode}
                                /* See function comments above */
                                onChange={divisionCheckboxChangeHandler}
                            />
                        )
                    })}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'h4'}>Resource Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter resource name"
                        onChange={event => setResource(event.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'h4'}>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={event => setUsername(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={'h4'}>Password</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="form-buttons"
                >
                    Add
                </Button>
            </Form>
        </div>
    );
}