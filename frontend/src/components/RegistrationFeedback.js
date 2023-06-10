/**
 * Dependency modules and hooks
 */
import {Link, useLocation} from 'react-router-dom';

/**
 * Import of components referenced in this function
 */
import {Header} from "./Header";


/**
 * Import of the main stylesheet generated by SCSS files and preprocessor
 */
import '../scss/main.css';

/**
 * Definition of the functional component for rendering user feedback upon registration
 */
export const RegistrationFeedback = () => {

    /* Making use of the state transmitted from the Registration component via React Router's Link component,
    * to read the response status from the backend */
    const location = useLocation();
    const status = location.state.status;

    /* Declaration of variables used for conditional feedback in the component */
    let feedbackMessagePrimary;
    let feedbackMessageSecondary;

    /* Determination of the content of the message that must be displayed depending on the different
    * status codes received. */
    if (status === 200) {
        feedbackMessagePrimary = 'Registration Successful.';
    } else if (status === 403) {
        feedbackMessagePrimary = 'Registration Failed';
        feedbackMessageSecondary = 'Either the email already exists or all fields were not completed. Please try again';
    } else {
        feedbackMessagePrimary = 'Registration Failed';
        feedbackMessageSecondary = 'Network or internal server error. Please try again.'
    }

    /* Conditional rendering of the component */
    return (
        <div>
            <Header/>
            <div className={'feedback-container'}>
                <div className={'feedback-container__message'}>
                    {status === 200 ? (
                        <h1 className={'primary-message'}>{feedbackMessagePrimary}</h1>
                    ) : (
                        <div>
                            <h1 className={'primary-message'}>{feedbackMessagePrimary}</h1>
                            <h2 className={'secondary-message'}>{feedbackMessageSecondary}</h2>
                        </div>
                    )}
                </div>
                <div className={'feedback-container__btn'}>
                    {status === 200 ? (
                        <Link to={'/login'}>
                            <button className={'btn-login'}>
                                Login
                            </button>
                        </Link>
                    ) : (
                        <Link to={'/registration'}>
                            <button className={'btn-register'}>
                                Register
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
)
};
