import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Redirect, Link } from "react-router-dom";
import { Segment, Container, Header, Button, Grid } from "semantic-ui-react";
import { format } from "date-fns";

import { fetchOnePost } from "./postSlice";
import { NavigationBar } from "../../components/navigation";

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.currentpost);
    const [RequestStatus, setRequestStatus] = useState("idle");

    useEffect(() => {
        if (RequestStatus === "idle") {
            try {
                setRequestStatus("pending");
                dispatch(fetchOnePost(postId));
            } catch (err) {
                console.error("Failed to get the post: ", err);
            }
        }
    }, [RequestStatus, postId, dispatch]);

    let content = <Segment>Loading</Segment>;

    if (post) {
        content = (
            <Segment>
                <Grid>
                    <Grid.Column width={13}>
                        <Header as="h4">
                            {post.title} By {post.author} on{" "}
                            {format(
                                Date.parse(post.timestamp),
                                "yyyy-MM-dd HH:mm"
                            )}
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='right'>
                        <Button>
                            <Link
                                to={`/editPost/${post._id}`}
                                className="button"
                            >
                                Edit Post
                            </Link>
                        </Button>
                    </Grid.Column>
                </Grid>

                <ReactMarkdown plugins={[gfm]} children={post.content} />
            </Segment>
        );
    }

    return (
        <>
            <NavigationBar />
            <Container>{content}</Container>
        </>
    );
};
