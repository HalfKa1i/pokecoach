import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/poke-logo.png";
import Nav from "react-bootstrap/Nav";
import AuthenticationButton from "./AuthenticationButton";

const Header = () => {
    const { user, isAuthenticated} = useAuth0();

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="/">
                <img src={logo} className="App-logo d-inline-block align-top" width="30"
                     height="30" alt="logo" />
                {' '}
                Poké Coach
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Navbar>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Navbar>
                    <Navbar>
                        {isAuthenticated && (
                            <Nav.Link href="profile">Profile</Nav.Link>
                        )}
                    </Navbar>
                </Nav>
                <Nav>
                    <Navbar>
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
                    </Navbar>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;