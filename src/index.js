import React from "react";
import { render } from 'react-dom';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

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
