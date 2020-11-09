import React from "react";
import { render } from 'react-dom';
import PropTypes from 'prop-types'
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import "semantic-ui-css/semantic.min.css";

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

render(<Root store={store} />, document.getElementById('root'))
