import React, { useEffect, useState } from "react";
import { Menu, Message, Dropdown, Divider } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Background from '../static/navigation/banner.jpg';

export const NavigationBar = () => {
    const user = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    const [authurl, setAuthurl] = useState("");
    const [username, setUsername] = useState("");
    const [authaction, setAuthAction] = useState("");

    useEffect(() => {
        if (authStatus === "loaded") {
            if (user.userId === null) {
                setUsername("Guest");
                setAuthurl("/login");
                setAuthAction("Login");
            } else {
                setUsername(user.username);
                setAuthurl("/logout");
                setAuthAction("Logout");
            }
        }
    }, [authStatus, user.userId, user.username]);

    return (
        <div>
            <div
                className="Banner"
                style={{
                    height: "200px",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 0%", /* Center the image */
                    backgroundSize: "cover", /* Resize the background image to cover the entire container */
                }}
            >
                <Message style={{backgroundColor: "rgba(170, 170, 170, 0.8)"}}>
                    <p>
                        {" "}
                        A React & Express.js Project By Yun Hong. This website
                        is currently under construction
                    </p>
                </Message>
            </div>
            <Menu style={{marginTop: "0%"}}>
                <Menu.Item header name="Welcome" color="blue" active={true}>
                    Welcome to Yun Hong's Homepage
                </Menu.Item>
                <Menu.Item name="home" href="/" />
                <Menu.Item name="about" href="/about" />
                <Menu.Item name="experimental" href="/" disabled />
                <Menu.Item name="hobby" href="/" disabled />
                <Menu.Menu position="right">
                    <Dropdown item text={username}>
                        <Dropdown.Menu>
                            <Dropdown.Item href={authurl}>
                                {authaction}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
            <Divider hidden />
        </div>
    );
};
