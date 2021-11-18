import {Button, PageHeader} from "antd";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {routes} from "../../shared/routes";
import {logout} from "../../reducers/user.slice";

const Navbar = ({isAuthorizationUser}) => {
    const dispatch = useDispatch();

    const noAuthorizationUserButton = [
        <Button key="1" type="default">
            <NavLink to={routes.login}>Войти</NavLink>
        </Button>,
        <Button key="2" type="default">
            <NavLink to={routes.registration}>Регистрация</NavLink>
        </Button>,
    ];
    const authorizationUserButton = [
        <Button key="1" type="default" onClick={()=>dispatch(logout())}>Выход</Button>
    ];

    return (
        <PageHeader
            title='Заголовок123'
            extra={isAuthorizationUser ? authorizationUserButton : noAuthorizationUserButton}
        />
    );
};

export default Navbar;