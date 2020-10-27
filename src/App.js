import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import { LoginUserPage } from "./features/auth/login";
import { LogoutUserPage } from "./features/auth/logout";
import { SinglePostPage } from "./features/post/singlePostPage";
import { fetchAuthUser } from "./features/auth/authSlice";

function App() {
    let loggedin = false;

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authStatus === "idle") dispatch(fetchAuthUser());
    }, [authStatus, dispatch]);

    if (authStatus === "loaded") {
        console.log(user.userId);
        if (user.userId !== null) {
            loggedin = true;
            console.log("logged in");
        }
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path="/post/:postId" component={SinglePostPage} />
                <Route path="/login">
                    {loggedin ? <Redirect to="/" /> : <LoginUserPage />}
                </Route>
                <Route path="/logout">
                    <LogoutUserPage />
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
