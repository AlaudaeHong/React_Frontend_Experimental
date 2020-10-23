import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAuthUser } from "./authSlice";
import { NavigationBar } from "../../components/navigation";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
    Container,
} from "semantic-ui-react";

export const LoginUserPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onLoginClicked = async () => {
        try {
            await dispatch(loginAuthUser({ username, password }));
        } catch (err) {
            console.error("Failed to login: ", err);
        }
    };

    return (
        /*
        Borrowed from 
        https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
        */
        <div>
            <NavigationBar />
            <Container>
                <Grid
                    textAlign="center"
                    style={{ height: "50vh" }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="blue" textAlign="center">
                            Log-in to your account
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="username"
                                    value={username}
                                    onChange={onUsernameChanged}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={onPasswordChanged}
                                />

                                <Button
                                    color="blue"
                                    fluid
                                    size="large"
                                    onClick={onLoginClicked}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href="#">Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
};
