/**
 * Dependency modules
 */
import {Routes, Route} from "react-router-dom";

/**
 * Import of the components needed in this module
 */
import {Home} from "./components/Home";
import {LandingPage} from "./components/LandingPage";
import {Registration} from "./components/Registration";
import {RegistrationFeedback} from "./components/RegistrationFeedback";
import {Login} from "./components/Login";
import {LoginFeedback} from "./components/LoginFeedback";
import {LogoutFeedback} from "./components/LogoutFeedback";
import {ViewCredentialRepo} from "./components/ViewCredentialRepo";

/**
 * Import of the main stylesheet generated by the SCSS files and preprocessor
 */
import './scss/main.css';

/**
 * Definition of the main App component that is mainly used to handle routing
 * @returns {JSX.Element}
 */
export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<LandingPage/>} exact/>
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/registrationFeedback'} element={<RegistrationFeedback/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/loginFeedback'} element={<LoginFeedback/>}/>
                <Route path={'/logoutFeedback'} element={<LogoutFeedback/>}/>
                <Route path={'viewCredentials'} element={<ViewCredentialRepo/>}/>
            </Routes>
        </div>
    );
}

