import {Button, PageHeader} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {routes} from "../../shared/routes";
import {logout} from "../../reducers/user.slice";
import {selectDirectoryStack} from "../../reducers/file.slice";
import "./navbar.css";

const TITLE_TEXT = 'CLOUD';
const REGISTRATION_TEXT = 'Регистрация';
const ENTRY_TEXT = 'Войти';
const EXIT_TEXT = 'Выход';

const Navbar = ({isAuthorizationUser}) => {
    const dispatch = useDispatch();
    const directoryStack = useSelector(selectDirectoryStack);

    const noAuthorizationUserButton = [
        <Button key={ENTRY_TEXT} type="default">
            <NavLink to={routes.login}>{ENTRY_TEXT}</NavLink>
        </Button>,
        <Button key={REGISTRATION_TEXT} type="default">
            <NavLink to={routes.registration}>{REGISTRATION_TEXT}</NavLink>
        </Button>,
    ];
    const authorizationUserButton = [
        <Button key={EXIT_TEXT} type="default" onClick={() => dispatch(logout())}>{EXIT_TEXT}</Button>
    ];

    return (
        <PageHeader
            title={TITLE_TEXT}
            className="navbar"
            breadcrumb={isAuthorizationUser ? {routes: directoryStack, separator: '/'} : null}
            extra={isAuthorizationUser ? authorizationUserButton : noAuthorizationUserButton}
        />
    );
};

export default Navbar;