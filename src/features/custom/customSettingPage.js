import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Container,
    Form,
    Message,
    Image,
    Grid,
} from "semantic-ui-react";

import { updateCustomSetting } from "./customSettingSlice";
import { NavigationBar } from "../../components/navigation";
import { FileUploadSegment } from "../file/uploadFile";

export const CustomSettingPage = () => {
    const setting = useSelector((state) => state.custom.setting);
    const settingStatus = useSelector((state) => state.custom.status);
    const dispatch = useDispatch();

    const [banner, setBanner] = useState("");

    var messages;

    useEffect(() => {
        if (settingStatus === "fulfilled") {
            setBanner(setting.banner);
        }
    }, [settingStatus, setting, dispatch]);

    const onBannerChanged = (e) => setBanner(e.target.value);

    const onSaveClicked = async () => {
        try {
            await dispatch(updateCustomSetting({ banner }));
        } catch (err) {
            console.error("Failed to update: ", err);
        }
    };

    if (settingStatus === "fulfilled") {
        messages = <Message>Updated</Message>;
    } else {
        messages = <Message>Updating</Message>;
    }

    return (
        <>
            <NavigationBar />
            <Grid celled>
                <Grid.Row columns={3}>
                    <Grid.Column width={3}>
                        <FileUploadSegment />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container>
                            {messages}
                            <Form>
                                <Grid>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={10}>
                                            <Form.Field>
                                                <label>Banner (use fid)</label>
                                                <Form.Input
                                                    placeholder="banner"
                                                    value={banner}
                                                    onChange={onBannerChanged}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <Image
                                                inline
                                                src={"/api/public/" + banner}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Button
                                            color="blue"
                                            size="large"
                                            onClick={onSaveClicked}
                                        >
                                            Save
                                        </Button>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};
