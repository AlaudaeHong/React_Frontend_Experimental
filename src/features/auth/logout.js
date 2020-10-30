import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuthUser } from "./authSlice";
import { Redirect } from "react-router-dom";
import {
    Message,
    Container,
} from "semantic-ui-react";

export const LogoutUserPage = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);

    let content;

    useEffect(() => {
        dispatch(logoutAuthUser());
    }, [authStatus, dispatch]);

    // Once finished the logout
    if (authStatus === "idle") {
        content = <Redirect to="/" />
    } else {
        content = <Message>Logging out</Message>
    }

    return (
    <Container>{content}</Container>
    );
};
