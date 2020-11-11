import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import { LoginUserPage } from "./features/auth/login";
import { LogoutUserPage } from "./features/auth/logout";
import { SinglePostPage } from "./features/post/singlePostPage";
import { fetchAuthUser, resetCheckByTime } from "./features/auth/authSlice";
import { PostEditorPage } from "./features/post/postEditorPage";
import { RemoveOnePost } from "./features/post/removePostPage";
import { FileListPage } from "./features/file/fileListPage";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    let loggedin = user && user.userId;

    useEffect(() => {
        if (authStatus === "idle") dispatch(fetchAuthUser());
    }, [authStatus, dispatch]);

    if (authStatus === "loaded") {
        if (user.userId !== null) {
            loggedin = true;
        }

        dispatch(resetCheckByTime());
    }

    return (
        <div className="App">
            <Switch>
                {/* Post Related Route */}
                <Route exact path="/post/a">
                    <PostEditorPage update={false} />
                </Route>
                <Route exact path="/post/e/:postId">
                    {loggedin ? (
                        <PostEditorPage update={true} />
                    ) : (
                        <LoginUserPage />
                    )}
                </Route>
                <Route exact path="/post/r/:postId">
                    {loggedin ? <RemoveOnePost /> : <LoginUserPage />}
                </Route>
                <Route exact path="/post/:postId" component={SinglePostPage} />

                {/* File Related Route */}
                <Route exact path="/file/a"></Route>
                <Route exact path="/file/r/:fileId"></Route>
                <Route path="/file">
                    <FileListPage />
                </Route>

                {/* Auth Related Route */}
                <Route path="/login">
                    {loggedin ? <Redirect to="/" /> : <LoginUserPage />}
                </Route>
                <Route path="/logout">
                    <LogoutUserPage />
                </Route>
                
                {/* Static Content Related Route */}
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
