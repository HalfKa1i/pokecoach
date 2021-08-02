import React from 'react';
import Spinner from "react-bootstrap/Spinner";

function Loading() {
    return (
        <Spinner animation="grow" variant="danger" />
    );
}

export default Loading;