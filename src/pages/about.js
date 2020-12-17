import React, { Component } from "react";
import {
    Menu,
    Image,
    Grid,
    Header,
    Container,
    Segment,
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { BlockStyle } from "../style/style.json";
import { NavigationBar } from "../components/navigation";

const backgroundColor = BlockStyle.backgroundColor;

const BioText = `
# Yun Hong

Hi, this is Yun Hong. I am currently pursuing M.S. in ECE at CMU. My
concentration are in system (Embedded, Networking, and
HPC/Distributed). But I have a growing interest in web technology
(The beauty of "One page works everywhere"). I will graduate in 2022
Spring. I am looking for a SDE job in system/backend/frontend field
after my graduation.
`;

const OthersText = `
# Others
* Github: https://github.com/AlaudaeHong
* Linkedin: https://www.linkedin.com/in/yun-hong-3a03bb151/
* Email: yunhong@[school email]
* Backend Repo (for this website): https://github.com/AlaudaeHong/Expressjs_Backend_Experimental
* Frontend Repo (for this website): https://github.com/AlaudaeHong/React_Frontend_Experimental
`;

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
                    <Grid celled="internally">
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <Segment
                                    size="large"
                                    style={{ backgroundColor }}
                                >
                                    {content}
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Menu
                                    vertical
                                    fluid
                                    pointing
                                    secondary
                                    style={{ backgroundColor }}
                                >
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
        <>
            <ReactMarkdown plugins={[gfm]} children={BioText} />
        </>
    );
}

function Resume() {
    return (
        <>
            <Header size="huge">Resume</Header>{" "}
            <Image src={require("../static/about/Resume.jpg")} fluid />
        </>
    );
}

function Others() {
    return (
        <>
            <ReactMarkdown plugins={[gfm]} children={OthersText} />
        </>
    );
}

export default About;
