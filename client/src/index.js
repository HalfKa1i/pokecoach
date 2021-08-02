import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Auth0Provider
        domain="pokecoach.us.auth0.com"
        clientId="dYvM1CRmI78bExhqOJIl7Hoc3i7FN8DO"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
registerServiceWorker();
