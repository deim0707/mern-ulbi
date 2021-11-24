import {useDispatch} from "react-redux";
import LoginRegistrationForm from "../../../shared-components/login-registration-form/LoginRegistrationForm";
import {getUserOnLogin} from "../../../reducers/user.slice";

const LoginForm = () => {
    const dispatch = useDispatch();
    const omSubmit = (user) => {
        console.log('Success LoginForm:', user);
        dispatch(getUserOnLogin(user));
    };

    return <LoginRegistrationForm omSubmit={omSubmit}/>;
};

export default LoginForm;