/* Import of dependency modules and hooks */
import axios from 'axios';
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

/* Import of the other components needed */
import {Header} from "./Header";

/* Import of the main stylesheet generated by the SCSS files and preprocessor */
import '../scss/main.css'
/* Import of React Bootstrap components */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* Definition of the login page component where user will login with an
* email and password */
export const Login = () => {

    /* Creation of a navigate instance to enable use of the useNavigate() hook */
    const navigate = useNavigate();

    /* Declaration and initialisation of the state variables */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* The handler that will be triggered by the submission of the user's
    * login details */
    const loginFormSubmitHandler = async (event) => {

        event.preventDefault();

        /* Configurations for axios request */
        const url = 'http://localhost:8000/api/login'
        const config = {
            email: email,
            password: password
        }

        try {
            /* Axios post request with the login details to the backend */
            await axios.post(url, config)
                .then(response => {
                    localStorage.setItem('JWT token', response.data.token);
                    /* Navigation to the login feedback page for user feedback */
                    navigate('/loginFeedback', {
                        replace: true,
                        state: {
                            status: response.status
                        }
                    })
                })
        } catch (error) {
            /* Navigation to the login feedback page for user feedback*/
            navigate('/loginFeedback', {
                state: {
                    status: error.request.status
                }
            })
        }
    }

    /* Rendering of the component */
    return (
        <div>
            <Header/>
            {/* Use of the React Bootstrap Form component for the rendering of the form */}
            <Form
                className={'login-form'}
                onSubmit={loginFormSubmitHandler}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={'h4'}>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={event => setEmail(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={'h4'}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="form-buttons"
                >
                    Login
                </Button>
            </Form>
        </div>
    );
}