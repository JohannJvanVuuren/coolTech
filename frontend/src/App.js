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
import {Login} from "./components/Login";
import {LogoutFeedback} from "./components/LogoutFeedback";
import {ViewCredentialRepo} from "./components/ViewCredentialRepo";
import {AddCredentialRepo} from "./components/AddCredentialRepo";
import {UpdateCredentialView} from "./components/UpdateCredentialView";
import {UpdateCredential} from "./components/UpdateCredential";
import {AssignDesignUsers} from "./components/AssignDesignUsers";
import {ChangeUserRole} from "./components/ChangeUserRole";
import {UserFeedback} from "./components/UserFeedback";

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
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/logoutFeedback'} element={<LogoutFeedback/>}/>
                <Route path={'viewCredentials'} element={<ViewCredentialRepo/>}/>
                <Route path={'/addCredentialRepo'} element={<AddCredentialRepo/>}/>
                <Route path={'/updateCredentialView'} element={<UpdateCredentialView/>}/>
                <Route path={'/updateCredential'} element={<UpdateCredential/>}/>
                <Route path={'/reassignUser'} element={<AssignDesignUsers/>}/>
                <Route path={'/changeUserRole'} element={<ChangeUserRole/>}/>
                <Route path={'/userFeedback'} element={<UserFeedback/>}/>
            </Routes>
        </div>
    );
}

