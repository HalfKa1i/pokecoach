import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";

import logo from './images/poke-logo.png';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="/">
              <img src={logo} className="App-logo d-inline-block align-top" width="30"
                   height="30" alt="logo" />
              {' '}
              Poké Coach</Navbar.Brand>
              <Nav className="mr-auto">
                {/*<Nav.Link href="/">Home</Nav.Link>*/}
                {/*<Nav.Link href="about">About</Nav.Link>*/}
              </Nav>
              <Nav>
                <Nav.Link href="/">ka1i</Nav.Link>
              </Nav>
          </Navbar>
          <Container fluid className="main-container">
            <Row>
              <Col>
                <div>
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/about">
                      <About />
                    </Route>
                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
