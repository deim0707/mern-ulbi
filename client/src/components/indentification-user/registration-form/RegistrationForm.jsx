import LoginRegistrationForm from "../../../shared-components/login-registration-form/LoginRegistrationForm";
import ApiService from "../../../services/api.service";

const RegistrationForm = () => {
    const omSubmit = (user) => {
        console.log('Success:', user);
        ApiService.UserApi.registration(user);
    };

    return <LoginRegistrationForm omSubmit={omSubmit} />;
};

export default RegistrationForm;