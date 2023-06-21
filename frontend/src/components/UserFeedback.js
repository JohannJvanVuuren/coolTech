/**
 * Dependency modules and hooks
 */
import {useLocation} from 'react-router-dom';

/**
 * Import of the other components needed
 */
import {NavigationBar} from "./NavigationBar";
import {Header} from "./Header";

/**
 * This functional component will handle all user feedback once a request
 * has been sent to the backend.
 */
export const UserFeedback = () => {

    /* Instantiating the useLocation object */
    const location = useLocation();

    /*
     * Reading the status codes and response messages passed from the components
     * via the Link component of React Router
     */
    const responseStatus = location.state.status;
    const feedbackMessage = location.state.message;

    /* Conditional rendering of the user feddback */
    return (
        <div>
            <Header/>
            <NavigationBar/>
            <div className={'user-feedback-wrapper'}>
                <div className={'user-feedback-container'}>
                    {responseStatus === 200 ? (
                        <div className={'feedback-container__message'}>
                            <h1 className={'primary-message success'}>{feedbackMessage}</h1>
                        </div>
                    ) : (
                        <div className={'feedback-container__message'}>
                            <h1 className={'primary-message fail'}>Error code: {responseStatus}</h1>
                            <h2 className={'secondary-message'}>{feedbackMessage}</h2>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}