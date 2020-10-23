import React, { Component } from "react";
import { Segment, Grid, Header, Container } from "semantic-ui-react";
import { NavigationBar } from "../components/navigation";

class Home extends Component {
    
    render() {
        return (
            <div className="App">
                <NavigationBar />
                <Container>
                    <Grid celled>
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <HomeIntro />
                            </Grid.Column>
                            <Grid.Column width={3}></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

function HomeIntro() {
    return (
        <Segment>
            <Header as="h3">Welcome:</Header>
            Welcome to my page. I am currently pursuing M.S. in ECE at CMU. My
            concentration are in system (Embedded, Networking, and
            HPC/Distributed). But I have a growing interest in web technology
            (The beauty of "One page works everywhere"). This website will be my
            homepage as well as my playground to learn and experiment frontend
            (React.js for now) and backend (Express.js for now) technicals.
        </Segment>
    );
}

export default Home;