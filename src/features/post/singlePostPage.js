import React, { useEffect, useState } from "react";
import gfm from "remark-gfm";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Button, Grid } from "semantic-ui-react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

import { fetchOnePost } from "./postSlice";
import { NavigationBar } from "../../components/navigation";
import { BlockStyle } from "../../style/style.json";
import { Markdown } from "../../misc/markdownConfig";

const backgroundColor = BlockStyle.backgroundColor;

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.currentpost);
    const user = useSelector((state) => state.auth.user);
    const postStatus = useSelector((state) => state.posts.status);

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

    let content = "Loading";

    if (post && postStatus === "succeeded") {
        let unauthedUser = true;
        if (user && user.username === post.author) {
            unauthedUser = false;
        }

        content = (
            <>
                <Grid>
                    <Grid.Column width={10}>
                        <Header as="h4">
                            {post.title} By {post.author} on{" "}
                            {format(
                                Date.parse(post.timestamp),
                                "yyyy-MM-dd HH:mm"
                            )}
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign="right">
                        <Button disabled={unauthedUser}>
                            <Link to={`/post/e/${post._id}`} className="button">
                                Edit Post
                            </Link>
                        </Button>
                        <Button disabled={unauthedUser}>
                            <Link to={`/post/r/${post._id}`} className="button">
                                Remove Post
                            </Link>
                        </Button>
                    </Grid.Column>
                </Grid>

                <Markdown plugins={[gfm]} children={post.content} />
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Segment style={{ backgroundColor, marginBottom: "14px" }}>
                    {content}
                </Segment>
            </Container>
        </>
    );
};
