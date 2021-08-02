import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

import Home from "./components/Home";
import Profile from "./components/Profile";
import Header from '../src/components/Header';
import CreateTeam from '../src/components/CreateTeam';
import Loading from '../src/components/Loading';
import Container from "react-bootstrap/Container";

import './App.css';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <Header/>
        <Container fluid className="main-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/createTeam" component={CreateTeam} />
            </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
