/**
 * Dependency modules and hooks
 */
import {Link, useLocation} from 'react-router-dom';

/**
 * Import of components referenced in this function
 */
import {Header} from "./Header";
import {NavigationBar} from "./NavigationBar";


/**
 * Import of the main stylesheet generated by SCSS files and preprocessor
 */
import '../scss/main.css';

export const LoginFeedback = () => {

    /* Creation of location instance to enable the use of the useLocation hook */
    const location = useLocation();

    /* Obtaining the response status from the backend transmitted from the Login component via the ReactRouter
    * Link component and the useLocation hook  */
    const status = location.state.status;

    /* Declaration of the variable needed for conditional messages to the user */
    let feedbackMessagePrimary;
    let feedbackMessageSecondary;

    /* The determination of which messsages will be displayed based on the status code received from the
    * backend */
    if (status === 200) {
        feedbackMessagePrimary = 'Login Successful.';
        feedbackMessageSecondary = 'Please select an option from the navigation bar.'
    } else if (status === 403) {
        feedbackMessagePrimary = 'Login Unsuccessful';
        feedbackMessageSecondary = 'The email entered is not valid.';
    } else if (status === 404) {
        feedbackMessagePrimary = 'Login Unsuccessful';
        feedbackMessageSecondary = 'Incorrect Login!'
    } else {
        feedbackMessagePrimary = 'Login Unsuccessful';
        feedbackMessageSecondary = 'Network or internal server error. Please try again.'
    }

    /* Conditional rendering of the component */
    return (
        <div className={'login-feedback'}>
            <Header/>
            {status === 200 && <NavigationBar/>}
            <div className={'login-feedback-container'}>
                <div className={'feedback-container__message'}>
                    {status === 200 ? (
                        <div>
                            <h1 className={'primary-message success'}>{feedbackMessagePrimary}</h1>
                            <h2 className={'secondary-message'}>{feedbackMessageSecondary}</h2>
                        </div>
                    ) : (
                        <div>
                            <h1 className={'primary-message fail'}>{feedbackMessagePrimary}</h1>
                            <h2 className={'secondary-message'}>{feedbackMessageSecondary}</h2>
                        </div>
                    )}
                </div>
                <div className={'feedback-container__btn'}>
                    {status !== 200 &&
                        <Link to={'/login'}>
                            <button className={'btn-register'}>
                                Login
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
};