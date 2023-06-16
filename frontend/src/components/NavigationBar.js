/* Import of the main stylesheet generated by the SCSS files and preprocessor */
import '../scss/main.css';
/* Import of the images for this component */
import {Link} from "react-router-dom";

/* Definition of the navigation header component that will appear at the top of all renders */
export const NavigationBar = () => {

    return (
        <div className={'navigation-container'}>
            <div className={'navigation-component'}>
                <Link
                    to={'/viewCredentials'}
                >
                    <button className={'btn-header'}>
                        View Credential Repos
                    </button>
                </Link>
                <Link
                    to={'/addCredentialRepo'}
                >
                    <button className={'btn-header'}>
                        Add Credential To Repo
                    </button>
                </Link>
                <Link
                    to={'/updateCredentialView'}
                >
                    <button className={'btn-header'}>
                        Update Credentials
                    </button>
                </Link>
                <Link
                    to={'/viewCredentials'}
                >
                    <button className={'btn-header'}>
                        Assign User to OU/Div
                    </button>
                </Link>
                <Link
                    to={'/viewCredentials'}
                >
                    <button className={'btn-header'}>
                         Designing User from OU/Div
                    </button>
                </Link>
                <Link
                    to={'/viewCredentials'}
                >
                    <button className={'btn-header'}>
                        Change User's Role
                    </button>
                </Link>
                <Link
                    to={'/home'}
                >
                    <button className={'btn-header'}>
                        Home
                    </button>
                </Link>
                <Link
                    to={'/logoutFeedback'}
                >
                    <button className={'btn-header'}>
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    )
}