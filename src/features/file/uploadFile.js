import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadOneFile } from "./fileSlice";
import {
    Dimmer,
    Item,
    Button,
    Container,
    Form,
    Segment,
    Ref,
    Menu,
    Grid,
    Label,
} from "semantic-ui-react";

import { assembleGetFileUrl } from "../../utils/fileHelper";
import { BlockStyle } from "../../style/style.json";

const backgroundColor = BlockStyle.backgroundColor;

const FileExcerpt = ({ file, onRemoveClicked }) => {
    const fileURL = assembleGetFileUrl(file._id);
    return (
        <>
            <Dimmer.Dimmable as={Item} key={file._id}>
                <Item.Image size="tiny" src={fileURL} />
                <Item.Content>
                    <Item.Header as="a">file._id</Item.Header>
                    <Item.Description>url: {fileURL}</Item.Description>
                </Item.Content>
                <Item.Extra>
                    <Button onClick={onRemoveClicked(file)}>Remove</Button>
                </Item.Extra>
            </Dimmer.Dimmable>
        </>
    );
};

export const FileUploadSegment = () => {
    var currentFiles = [];
    var notAuthed = true;

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [file, setFile] = useState(null);

    const onRemoveClicked = async () => {};

    const onAddClicked = async () => {
        try {
            if (!file) {
                throw new Error("No File input");
            }

            var formdata = new FormData();
            formdata.append("image", file);
            await dispatch(uploadOneFile({ formdata }));

            currentFiles.concat(file);
        } catch (err) {
            console.log(err);
        }
    };

    if (user && user.userId) {
        notAuthed = false;
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

    return <Container>{AddProp}</Container>;
};
