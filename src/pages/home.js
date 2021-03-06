import React, { Component } from "react";
import {
    Segment,
    Grid,
    Header,
    Container,
    Message,
    Menu,
} from "semantic-ui-react";
import { NavigationBar } from "../components/navigation";
import { PostsList } from "../features/post/postList";
import { BlockStyle } from "../style/style.json";

const backgroundColor = BlockStyle.backgroundColor;

function HomeIntro() {
    return (
        <>
            <Message warning>
                This is a personal website and treat it nicely
            </Message>
            <Segment style={{ backgroundColor }}>
                <Header as="h3">Welcome:</Header>
                Welcome to my page. I am currently pursuing M.S. in ECE at CMU.
                My concentration are in system (Embedded, Networking, and
                HPC/Distributed). But I have a growing interest in web
                technology (The beauty of "One page works everywhere"). This
                website will be my homepage as well as my playground to learn
                and experiment frontend (React.js for now) and backend
                (Express.js for now) technology.
            </Segment>
        </>
    );
}

class Home extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <Grid celled="internally">
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <HomeIntro />
                                <PostsList catalog="[Tech]" />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Menu
                                    vertical
                                    fluid
                                    style={{ backgroundColor }}
                                >
                                    <Menu.Item>
                                        <Menu.Header>Post</Menu.Header>
                                        <Menu.Menu>
                                            <Menu.Item></Menu.Item>
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Home;
