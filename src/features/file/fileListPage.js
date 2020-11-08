import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    Image,
    Button,
    Dimmer,
    Grid,
} from "semantic-ui-react";
import { BlockStyle } from "../../style/style.json";
import { NavigationBar } from "../../components/navigation";

import { fetchFileMatas, selectAllFiles, removeOneFile } from "./fileSlice";
import { FileUploadSegment } from "./uploadFile";

import { assembleGetFileUrl } from "../../utils/fileHelper";

const backgroundColor = BlockStyle.backgroundColor;

const FileExcerpt = ({ file }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [requestStatus, setRequestStatus] = useState("idle");
    const [dimStatus, setDimStatus] = useState(false);

    var notAuthed = true;

    const onRemoveClicked = async () => {
        if (requestStatus === "idle") {
            setRequestStatus("pending");
            setDimStatus(true);
            await dispatch(removeOneFile({ fid: file._id }));
        }
    };

    if (user && user.userId) {
        notAuthed = false;
    }

    const fileURL = assembleGetFileUrl(file._id);
    var cardContent = (
        <Dimmer.Dimmable
            as={Card}
            dimmed={dimStatus}
            key={file._id}
            style={{ backgroundColor, height: "300px" }}
        >
            <Card.Content>
                <Image
                    src={fileURL}
                    size="medium"
                    style={{ maxHeight: "200px", width: "auto" }}
                />
                {fileURL}
            </Card.Content>
            <Card.Content extra>
                <Button onClick={onRemoveClicked} disabled={notAuthed}>
                    Remove File
                </Button>
            </Card.Content>
        </Dimmer.Dimmable>
    );

    return <>{cardContent}</>;
};

export const FileListPage = () => {
    const dispatch = useDispatch();
    const files = useSelector(selectAllFiles);

    const fileStatus = useSelector((state) => state.files.status);
    const error = useSelector((state) => state.files.error);

    useEffect(() => {
        if (fileStatus === "idle") {
            dispatch(fetchFileMatas());
        }
    }, [fileStatus, dispatch]);

    let content;

    if (fileStatus === "loading") {
        content = <div className="loader">Loading...</div>;
    } else if (fileStatus === "succeeded") {
        content = files.map((file) => (
            <FileExcerpt key={file._id} file={file} />
        ));
    } else if (fileStatus === "error") {
        content = <div>{error}</div>;
    }

    return (
        <>
            <NavigationBar />
            <Grid celled>
                <Grid.Column width={3} textAlign="left">
                    <FileUploadSegment />
                </Grid.Column>
                <Grid.Column width={12}>
                    <Card.Group>{content}</Card.Group>
                </Grid.Column>
            </Grid>
        </>
    );
};
