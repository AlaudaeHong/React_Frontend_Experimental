import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Link, Redirect, useParams } from "react-router-dom";
import { Grid, Form, Button } from "semantic-ui-react";
import { format } from "date-fns";

import { NavigationBar } from "../../components/navigation";
import { fetchOnePost, updateOnePost, createOnePost } from "./postSlice";

export const PostEditorPage = ({ update }) => {
    const { postId } = useParams();

    const post = useSelector((state) => state.posts.currentpost);

    const [markdownContent, setMarkdownContent] = useState("");
    const [checkStatus, setCheckStatus] = useState("pending");

    const handleMarkdownChange = (e) => {
        setMarkdownContent(e.target.value);
    };

    if (post && checkStatus === "pending" && update) {
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
                        update={update}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <ReactMarkdown plugins={[gfm]} children={markdownContent} />
                </Grid.Column>
            </Grid>
        </>
    );
};

function Editor({ postId, markdownValue, markdownOnChange, update }) {
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
            let apost = { title, catalog, content: markdownValue };
            if (update) {
                await dispatch(
                    updateOnePost({
                        postId,
                        post: apost,
                    })
                );
            } else {
                await dispatch(
                    createOnePost({
                        post: apost,
                    })
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (RequestStatus === "idle" && update) {
            try {
                setRequestStatus("pending");
                dispatch(fetchOnePost(postId));
            } catch (err) {
                console.error("Failed to get the post: ", err);
            }
        }
    }, [RequestStatus, postId, dispatch]);

    if (post && RequestStatus === "pending" && update) {
        setTitle(post.title);
        setCatalog(post.catalog);
        setRequestStatus("succeeded");
    }

    if (SubmitStatus === "pending" && postStatus === "uploaded") {
        console.log(post);
        let redirecturl = "/post/" + post._id;
        return <Redirect to={redirecturl} />;
    }

    return (
        <EditorBase
            titleValue={title}
            titleOnChange={onTitleChange}
            catalogValue={catalog}
            CatalogOnChange={onCatalogChange}
            markdownValue={markdownValue}
            markdownOnChange={markdownOnChange}
            onSubitClick={handleSubmitClick}
        />
    );
}

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

function EditorBase({
    titleValue,
    titleOnChange,
    catalogValue,
    CatalogOnChange,
    markdownValue,
    markdownOnChange,
    onSubitClick,
}) {
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
                                    value={titleValue}
                                    onChange={titleOnChange}
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
                                    value={catalogValue}
                                    onChange={CatalogOnChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={3} verticalAlign="bottom">
                            <Button
                                color="blue"
                                fluid
                                size="large"
                                onClick={onSubitClick}
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
