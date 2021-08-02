import React, {useState} from 'react';
import Battle from './Battle';
import Team from './Team';
import { useAuth0 } from "@auth0/auth0-react";

import './Home.css';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <Row>
            {isAuthenticated && (
                <React.Fragment>
                    <Col xs={12} md={7}>
                        <Team/>
                    </Col>
                    <Col xs={12} md={5}>
                        <Battle/>
                    </Col>
                </React.Fragment>
            )}
            {!isAuthenticated && (
                <React.Fragment>
                    <Col>
                        <AlertDismissible/>
                        <Battle/>
                    </Col>
                </React.Fragment>
            )}
        </Row>
    );
}

const AlertDismissible = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="info" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Want to get personalized battle recommendations?</Alert.Heading>
                <p>
                    Login or create a free account to start building your own teams. Battle view will use your personal team to make smarter battle recommendations.
                </p>
            </Alert>
        );
    }
    return null;
}


export default Home;