import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Message, Container } from "semantic-ui-react";

import { removeOnePost } from "./postSlice";

export const RemoveOnePost = () => {
    const dispatch = useDispatch();
    const postStatus = useSelector((state) => state.posts.status);

    const [requestStatus, setRequestStatus] = useState("idle");

    let content;
    const { postId } = useParams();

    useEffect(() => {
        if (requestStatus === "idle") {
            setRequestStatus("pending");
            dispatch(removeOnePost({ postId }));
        }
    }, [postStatus, dispatch]);

    if (postStatus === "idle") {
        content = <Redirect to="/home" />;
    } else {
        content = <Message>Removing Post</Message>;
    }

    return <Container>{content}</Container>;
};
