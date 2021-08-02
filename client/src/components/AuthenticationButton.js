import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button variant="light" onClick={() => loginWithRedirect()}>Login</Button>
    );
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button variant="light" onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </Button>
    );
};

export default AuthenticationButton;

