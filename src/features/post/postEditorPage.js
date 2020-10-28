import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Link, Redirect } from "react-router-dom";
import { Grid, Form, Button } from "semantic-ui-react";
import { format } from "date-fns";

import { NavigationBar } from "../../components/navigation";
import { fetchOnePost, updateOnePost } from "./postSlice";

export const PostEditorPage = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector((state) => state.posts.currentpost);

    const [markdownContent, setMarkdownContent] = useState("");
    const [checkStatus, setCheckStatus] = useState("pending");

    const handleMarkdownChange = (e) => {
        setMarkdownContent(e.target.value);
    };

    if (post && checkStatus === "pending") {
        setMarkdownContent(post.content);
        setCheckStatus("succeed");
    }

    return (
        <>
            <NavigationBar />
            <Grid celled="internally">
                <Grid.Column width={8}>
                    <Editor
                        postId={postId}
                        markdownValue={markdownContent}
                        markdownOnChange={handleMarkdownChange}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <ReactMarkdown plugins={[gfm]} children={markdownContent} />
                </Grid.Column>
            </Grid>
        </>
    );
};

const catalogOptions = [
    {
        key: "Tech",
        text: "Tech",
        value: "Tech",
    },
    {
        key: "Kancolle",
        text: "Kancolle",
        value: "Kancolle",
    },
    {
        key: "Others",
        text: "Others",
        value: "Others",
    },
    {
        key: "none",
        text: "none",
        value: "none",
    },
];

function Editor({ postId, markdownValue, markdownOnChange }) {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.currentpost);
    const postStatus = useSelector((state) => state.posts.status);

    const [RequestStatus, setRequestStatus] = useState("idle");
    const [SubmitStatus, setSubmitStatus] = useState("idle");
    const [title, setTitle] = useState("");
    const [catalog, setCatalog] = useState("");

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onCatalogChange = (e, d) => {
        setCatalog(d.value);
    };

    const handleSubmitClick = async () => {
        try {
            await setSubmitStatus("pending");
            await dispatch(
                updateOnePost({
                    postId,
                    post: {
                        title,
                        catalog,
                        content: markdownValue,
                    },
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

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

    if (post && RequestStatus === "pending") {
        setTitle(post.title);
        setCatalog(post.catalog);
        setRequestStatus("succeeded");
    }

    if (SubmitStatus === "pending" && postStatus === "succeeded") {
        let redirecturl = "/post/" + postId;
        return <Redirect to={redirecturl} />;
    }

    return (
        <>
            <Form>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={10}>
                            <Form.Field>
                                <label>Title</label>
                                <Form.Input
                                    placeholder="title"
                                    value={title}
                                    onChange={onTitleChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Form.Field>
                                <label>Catalog</label>
                                <Form.Dropdown
                                    placeholder="Select a catalog"
                                    fluid
                                    selection
                                    options={catalogOptions}
                                    value={catalog}
                                    onChange={onCatalogChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={3} verticalAlign="bottom">
                            <Button
                                color="blue"
                                fluid
                                size="large"
                                onClick={handleSubmitClick}
                            >
                                Submit Post
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form.Field>
                    <label>
                        Content (Markdown Supported & Inline HTML Disabled)
                    </label>
                    <Form.TextArea
                        placeholder="Tell us more"
                        value={markdownValue}
                        onChange={markdownOnChange}
                        style={{ height: "50vh" }}
                    />
                </Form.Field>
            </Form>
        </>
    );
}
