/**
 * Dependency modules and hooks
 */
import {useLocation} from 'react-router-dom';

/**
 * Import of the other components needed
 */
import {NavigationBar} from "./NavigationBar";
import {Header} from "./Header";

export const ReassignUserFeedback = () => {

    const location = useLocation();
    const responseStatus = location.state.status;
    const responseMessage = location.state.message;

    let feedbackMessage;

    if (responseStatus === 200) {
        feedbackMessage = 'Update Successful';
    } else {
        feedbackMessage = responseMessage;
    }

    return (
        <div>
            <Header/>
            <NavigationBar/>
            <div className={'add-credentials-wrapper'}>
                <div className={'add-credentials-container'}>
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