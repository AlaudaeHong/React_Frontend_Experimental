import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Segment } from "semantic-ui-react";

import { fetchOnePost } from "./postSlice";
import { Redirect } from "react-router-dom";

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
                setRequestStatus("succeed");
            }
            catch (err){
                console.error('Failed to get the post: ', err)
            }
        }
    }, [RequestStatus, dispatch]);

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <Segment>
                <h2>
                    {post.title} by {post.author}
                </h2>
                <ReactMarkdown plugins={[gfm]} children={post.content} />
            </Segment>
        </section>
    );
};
