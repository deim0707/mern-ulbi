import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import RegistrationForm from "../registration-form/RegistrationForm";
import Navbar from "../navbar/Navbar";
import LoginForm from "../login-form/LoginForm";
import {routes} from "../../shared/routes";
import "./app.css"
import {useDispatch, useSelector} from "react-redux";
import {getUserOnAuthorization, selectIsAuthorizationUser} from "../../reducers/user.slice";
import {useEffect} from "react";
import {getToken} from "../../shared/localStorageUtils";

function App() {
    const dispatch = useDispatch();
    const isAuthorizationUser = useSelector(selectIsAuthorizationUser);

    // если в локалСторедже сохранён токен, но пользователь в приложении не авторизован - авторизовываем
    function authorizationUserOnMount () {
        const token = getToken();
        if(token && !isAuthorizationUser) {
            dispatch(getUserOnAuthorization())

        }
    }
    useEffect(authorizationUserOnMount,[])

    return (
        <Router>
            <div className='app'>
                <Navbar isAuthorizationUser={isAuthorizationUser}/>
                {!isAuthorizationUser && (
                    <Switch>
                        <Route path={routes.registration} component={RegistrationForm}/>
                        <Route path={routes.login} component={LoginForm}/>
                    </Switch>
                )}
            </div>
        </Router>
    );
}

export default App;
