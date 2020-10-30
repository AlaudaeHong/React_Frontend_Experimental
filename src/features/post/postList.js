// Borrowed from https://github.com/reduxjs/redux-essentials-example-app/blob/checkpoint-3-postRequests/src/features/posts/PostsList.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Header, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { selectAllPosts, fetchPosts } from "./postSlice";
import { format } from "date-fns";
import { BlockStyle } from "../../style/style.json";

const backgroundColor = BlockStyle.backgroundColor;

const PostExcerpt = ({ post }) => {
    return (
        <Segment key={post._id} style={{ backgroundColor }}>
            <Grid celled="internally">
                <Grid.Column width={10}>
                    <Link to={`/post/${post._id}`}>
                        <Header as="h3">{post.title}</Header>
                    </Link>
                </Grid.Column>
                <Grid.Column width={3}>{post.author}</Grid.Column>
                <Grid.Column width={3}>
                    {format(Date.parse(post.timestamp), "yyyy-MM-dd HH:mm")}
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    const postStatus = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;

    if (postStatus === "loading") {
        content = <div className="loader">Loading...</div>;
    } else if (postStatus === "succeeded") {
        // Sort posts in reverse chronological order by datetime string
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

        content = orderedPosts.map((post) => (
            <PostExcerpt key={post._id} post={post} />
        ));
    } else if (postStatus === "error") {
        content = <div>{error}</div>;
    }

    return (
        <>
            <Header as="h3" dividing>
                All Posts
            </Header>
            <Segment.Group>{content}</Segment.Group>
        </>
    );
};
