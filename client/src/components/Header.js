import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/poke-logo.png";
import Nav from "react-bootstrap/Nav";
import AuthenticationButton from "./AuthenticationButton";

const Header = () => {
    const { user, isAuthenticated} = useAuth0();

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="/">
                <img src={logo} className="App-logo d-inline-block align-top" width="30"
                     height="30" alt="logo" />
                {' '}
                Poké Coach</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {isAuthenticated && (
                    <Nav.Link href="profile">Profile</Nav.Link>
                )}
            </Nav>
            <Nav>
                <Navbar.Collapse className="justify-content-end">
                    {isAuthenticated && (
                        <Navbar.Text>
                            <Navbar.Brand href="home">
                                <img
                                    src={user.picture}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt={user.name}
                                />
                            </Navbar.Brand>
                            {user.nickname}
                        </Navbar.Text>
                    )}
                    <Navbar>
                        <AuthenticationButton/>
                    </Navbar>
                </Navbar.Collapse>
            </Nav>
        </Navbar>
    );
}

export default Header;