import React, { useState } from "react";
import { Container, Grid, Menu } from "semantic-ui-react";

import { NavigationBar } from "../components/navigation";
import { PostsList } from "../features/post/postList";
import { BlockStyle } from "../style/style.json";

const backgroundColor = BlockStyle.backgroundColor;

export const HobbyMainPage = () => {
    const [activeItem, setActiveItem] = useState("kancolle");

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    var content;

    if (activeItem === "kancolle") {
        content = <PostsList catalog="[Hobby]Kancolle" />;
    } else if (activeItem === "anime") {
        content = <PostsList catalog="[Hobby]Anime" />;
    } else if (activeItem === "hobby") {
        content = <PostsList catalog="[Hobby]Hobby" />;
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Grid celled="internally">
                    <Grid.Row>
                        <Grid.Column width={13}>{content}</Grid.Column>
                        <Grid.Column width={3}>
                            <Menu
                                vertical
                                fluid
                                pointing
                                secondary
                                style={{ backgroundColor }}
                            >
                                <Menu.Item
                                    name="kancolle"
                                    active={activeItem === "kancolle"}
                                    onClick={handleItemClick}
                                />
                                <Menu.Item
                                    name="anime"
                                    active={activeItem === "anime"}
                                    onClick={handleItemClick}
                                />
                                <Menu.Item
                                    name="hobby"
                                    active={activeItem === "hobby"}
                                    onClick={handleItemClick}
                                />
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    );
};
