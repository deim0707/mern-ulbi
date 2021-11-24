import {useEffect} from "react";
import {
    BrowserRouter as Router, Redirect,
    Route,
    Switch
} from 'react-router-dom'
import {routes} from "../../shared/routes";
import {useDispatch, useSelector} from "react-redux";
import {getUserOnAuthorization, selectIsAuthorizationUser} from "../../reducers/user.slice";
import {getToken} from "../../shared/localStorageUtils";
import RegistrationForm from "../indentification-user/registration-form/RegistrationForm";
import Navbar from "../navbar/Navbar";
import LoginForm from "../indentification-user/login-form/LoginForm";
import FilesWrapper from "../files/files-wrapper/FilesWrapper";
import "./app.css"

function App() {
    const dispatch = useDispatch();
    const isAuthorizationUser = useSelector(selectIsAuthorizationUser);

    // если в локалСторедже сохранён токен, но пользователь в приложении не авторизован - авторизовываем
    function authorizationUserOnMount() {
        const token = getToken();
        if (token && !isAuthorizationUser) {
            dispatch(getUserOnAuthorization())

        }
    }

    useEffect(authorizationUserOnMount, [dispatch, isAuthorizationUser])

    const unauthorizedUserRoutes = (
        <Switch>
            <Route path={routes.registration} component={RegistrationForm}/>
            <Route path={routes.login} component={LoginForm}/>
            <Redirect to={routes.login}/>
        </Switch>
    );
    const authorizedUserRoutes = (
        <Switch>
            <Route exact path={routes.homepage} component={FilesWrapper}/>
            <Redirect to={routes.homepage}/>
        </Switch>
    );

    return (
        <Router>
            <div className='app'>
                <Navbar isAuthorizationUser={isAuthorizationUser}/>
                {isAuthorizationUser ? authorizedUserRoutes : unauthorizedUserRoutes}
            </div>
        </Router>
    );
}

export default App;
