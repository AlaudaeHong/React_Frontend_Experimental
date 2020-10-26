import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { selectAllPosts, fetchPosts } from "./postSlice";

const PostExcerpt = ({ post }) => {
    console.log(post);
    return (
        <Segment key={post.id}>
            <Link to={`/post/${post._id}`} className="button muted-button">
                {post.title} by {post.author}
            </Link>
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

        content = posts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ));
    } else if (postStatus === "error") {
        content = <div>{error}</div>;
    }

    return (
        <Segment className="posts-list">
            <h2>Posts</h2>
            {content}
        </Segment>
    );
};
