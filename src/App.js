import React from "react";
import Home from "./pages/home";
import About from "./pages/about";
import {LoginUserPage} from "./features/auth/login"

import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                {/* <Route path="/db">
                <DB />
            </Route>
            
             */}
                <Route path="/login">
                    <LoginUserPage />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
