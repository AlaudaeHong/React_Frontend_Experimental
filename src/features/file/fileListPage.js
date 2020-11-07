import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Segment,
    Header,
    Grid,
    Card,
    Image,
    Button,
    Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BlockStyle } from "../../style/style.json";
import { NavigationBar } from "../../components/navigation";

import { fetchFileMatas, selectAllFiles } from "./fileSlice";

import {
    assembleGetFileUrl,
} from "../../utils/fileHelper";

const backgroundColor = BlockStyle.backgroundColor;

const FileExcerpt = ({ file }) => {
    const fileURL = assembleGetFileUrl(file._id);

    return (
        <Card key={file._id}>
            <Card.Content>
                <Image src={fileURL} size="medium" />
            </Card.Content>
            <Card.Content extra>
                <Button>
                    {/* To be modified */}
                    <Link to="" className="button">
                        Remove File
                    </Link>
                </Button>
            </Card.Content>
        </Card>
    );
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
            <Container>
                <Card.Group>{content}</Card.Group>
            </Container>
        </>
    );
};
