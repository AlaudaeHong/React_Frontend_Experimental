import React, { Component } from "react";
import Home from "./home";
import About from "./about";

import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                {/* <Route path="/db">
                <DB />
            </Route>
            
            <Route paht="/login">
                <Login />
            </Route> */}
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
