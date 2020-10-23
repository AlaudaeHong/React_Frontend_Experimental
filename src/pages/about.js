import React, { Component } from "react";
import NavigationBar from "../components/navigation";
import { Menu, Image, Grid, Header, Container } from "semantic-ui-react";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: "bio" };

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        let content;

        if (activeItem === "bio") {
            content = <Bio />;
        } else if (activeItem === "resume") {
            content = <Resume />;
        } else if (activeItem === "others") {
            content = <Others />;
        }

        return (
            <div>
                <NavigationBar isLoggedIn={true} />

                <Container>
                    <Grid celled>
                        <Grid.Row>
                            <Grid.Column width={12}>{content}</Grid.Column>
                            <Grid.Column width={4}>
                                <Menu pointing secondary vertical>
                                    <Menu.Item
                                        name="bio"
                                        active={activeItem === "bio"}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name="resume"
                                        active={activeItem === "resume"}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name="others"
                                        active={activeItem === "others"}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

function Bio() {
    return (
        <div>
            <Header size="huge">YUN HONG</Header>
            <p></p>
        </div>
    );
}

function Resume() {
    return (
        <div>
            <h1>Resume</h1>
            <Image
                src={require("../static/about/Resume1024_1.jpg")}
                size="huge"
                fluid
            />
        </div>
    );
}

function Others() {
    return (
        <div>
            <Header size="huge">Others</Header>
            <Header size="medium">GitHub</Header>
            <p>https://github.com/AlaudaeHong</p>
            <Header size="medium">Linkedin</Header>
            <p>https://www.linkedin.com/in/yun-hong-3a03bb151/</p>
            <Header size="medium">email</Header>
            <p>yunhong@[school email]</p>
            <Header size="medium">Backend Repo(Experss.js)</Header>
            <p>https://github.com/AlaudaeHong/Expressjs_Backend_Experimental</p>
            <Header size="medium">Frontend Repo(React.js)</Header>
            <p>https://github.com/AlaudaeHong/React_Frontend_Experimental</p>
        </div>
    );
}

export default About;
