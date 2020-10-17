import React, { useState } from "react";
import { Menu, Header, Message } from "semantic-ui-react";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            authURL: "",
            loginMsg: "",
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.UpdateState = this.UpdateState.bind(this);
    }

    handleItemClick(e) {
        this.setState((state) => ({
            isLoggedIn: !state.isLoggedIn,
        }));

        this.UpdateState();

        console.log(this.state.loginMsg);
    }

    UpdateState() {
        if (this.state.isLoggedIn) {
            this.setState({
                loginMsg: "User",
                authURL: "/logout",
            });
        } else {
            this.setState({
                loginMsg: "Guset",
                authURL: "/login",
            });
        }
    }

    componentDidMount() {
        this.UpdateState();
    }

    render() {
        return (
            <div>
                <Message>A React & Express.js Project</Message>
                <Menu inverted>
                    <Menu.Item header name="Welcome">
                        Welcome to Yun Hong's Homepage
                    </Menu.Item>
                    <Menu.Item name="home" href="/" />
                    <Menu.Item name="bio" href="/" />
                    <Menu.Item name="experimental" href="/" />
                    <Menu.Item name="hobby" href="/" />
                    <Menu.Menu position="right">
                        {/* <Menu.Item name={loginMsg} href={authURL} onClick={handleItemClick}/> */}
                        <Menu.Item
                            name={this.state.loginMsg}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default NavigationBar;
