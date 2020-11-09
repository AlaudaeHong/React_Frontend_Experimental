import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dimmer,
    Item,
    Button,
    Container,
    Form,
    Segment,
} from "semantic-ui-react";

import { assembleGetFileUrl } from "../../utils/fileHelper";
import { BlockStyle } from "../../style/style.json";
import { uploadOneFile, removeOneFile } from "./fileSlice";

const backgroundColor = BlockStyle.backgroundColor;

const FileExcerpt = ({ fid }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [requestStatus, setRequestStatus] = useState("idle");

    const fileURL = assembleGetFileUrl(fid);
    var notAuthed = true;

    const onRemoveClicked = async () => {
        if (requestStatus === "idle") {
            setRequestStatus("pending");
            await dispatch(removeOneFile({ fid }));
        }
    };

    if (user && user.userId) {
        notAuthed = false;
    }

    return (
        <>
            <Dimmer.Dimmable as={Segment} key={fid} style={{ backgroundColor }}>
                <Item>
                    <Item.Image size="tiny" src={fileURL} />
                    <Item.Content>
                        <Item.Description>{fileURL}</Item.Description>
                    </Item.Content>
                    <Item.Extra>
                        <Button onClick={onRemoveClicked} disabled={notAuthed}>
                            Remove File
                        </Button>
                    </Item.Extra>
                </Item>
            </Dimmer.Dimmable>
        </>
    );
};

export const FileUploadSegment = () => {
    var notAuthed = true;
    let content;

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const requestStatus = useSelector((state) => state.files.status);
    const fileInSession = useSelector((state) => state.files.fileInSession);

    const [file, setFile] = useState(null);
    const [updateStatus, setUpdateStatus] = useState("idle");

    const onAddClicked = async () => {
        try {
            if (!file) {
                throw new Error("No File input");
            }
            setUpdateStatus("pending");

            var formdata = new FormData();
            formdata.append("image", file);
            dispatch(uploadOneFile({ formdata }));
        } catch (err) {
            console.log(err);
        }
    };

    if (user && user.userId) {
        notAuthed = false;
    }

    if (requestStatus !== "pending") {
        if (updateStatus === "pending") {
            setUpdateStatus("idle");
        }

        content = fileInSession.map((file) => (
            <FileExcerpt key={file._id} fid={file._id} />
        ));
    } else {
        content = <div>Loading...</div>;
    }

    var AddProp = (
        <Segment style={{ backgroundColor }}>
            <Form>
                <Form.Input
                    type="file"
                    size="mini"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
                <Button onClick={onAddClicked} disabled={notAuthed}>
                    Add
                </Button>
            </Form>
        </Segment>
    );

    return (
        <Container>
            {AddProp}
            <Segment.Group>{content}</Segment.Group>
        </Container>
    );
};
