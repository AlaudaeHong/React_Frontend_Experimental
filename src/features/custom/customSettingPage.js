import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateCustomSetting } from "./customSettingSlice";
import { NavigationBar } from "../../components/navigation";
import { Button, Container, Form, Message } from "semantic-ui-react";

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
            <Container>
                {messages}
                <Form>
                    <Form.Field>
                        <label>Banner (use fid)</label>
                        <Form.Input
                            placeholder="banner"
                            value={banner}
                            onChange={onBannerChanged}
                        />
                    </Form.Field>
                    <Button color="blue" size="large" onClick={onSaveClicked}>
                        Save
                    </Button>
                </Form>
            </Container>
        </>
    );
};
