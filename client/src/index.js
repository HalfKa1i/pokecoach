import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import store from './app/store'
import { Provider } from 'react-redux'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain="pokecoach.us.auth0.com"
            clientId="dYvM1CRmI78bExhqOJIl7Hoc3i7FN8DO"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
