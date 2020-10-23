import React, { useEffect, useState } from "react";
import { Menu, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";

export const NavigationBar = () => {
    const user = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    const [authurl, setAuthurl] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (authStatus === "loaded") {
            if (user.userId === null) {
                setUsername("Guest");
                setAuthurl("/login");
            } else {
                setUsername(user.username);
                setAuthurl("/logout");
            }
        }
    });

    return (
        <div className="Navigation">
            <div className="Banner">
                <Message>
                    <p>
                        {" "}
                        A React & Express.js Project By Yun Hong. This website
                        is currently under construction
                    </p>
                </Message>
            </div>
            <Menu inverted>
                <Menu.Item header name="Welcome" color="blue" active={true}>
                    Welcome to Yun Hong's Homepage
                </Menu.Item>
                <Menu.Item name="home" href="/" />
                <Menu.Item name="about" href="/about" />
                <Menu.Item name="experimental" href="/" />
                <Menu.Item name="hobby" href="/" />
                <Menu.Menu position="right">
                    <Menu.Item name={username} href={authurl} />
                </Menu.Menu>
            </Menu>
        </div>
    );
};
