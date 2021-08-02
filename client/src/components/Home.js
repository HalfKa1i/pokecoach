import React from 'react';
import Battle from './Battle';

import './Home.css';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {BrowserRouter as Router} from "react-router-dom";

const Home = () => {
    return (
        <Row>
            <Col>
                <Battle/>
            </Col>
        </Row>
    );
}

export default Home;