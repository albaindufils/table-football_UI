import {Button, Form, Input} from "antd";
import React from "react";
import {playerFormToPlayerJson} from "../../commons/mappers";
import {Api} from "../../services/api";
import {FORM_BUTTON_LAYOUT, FORM_LAYOUT} from "../../commons/constants";
import {handleError, notifyApp} from "../../commons/helpers";
import {IActionContainer} from "../../commons/interfaces/IActionContainer";
import {PlayerJsonld} from "../../commons/model";
import {Mode} from "../../commons/enum/ModeEntity";

interface IProps extends IActionContainer {
    player?: PlayerJsonld
}

function PlayerModification(props: IProps) {
    const [form] = Form.useForm();
    const [modifyLoading, setModifyLoading] = React.useState<boolean>(false);

    const onFinish = (values: any) => {
        setModifyLoading(true);
        Api.addPlayer(playerFormToPlayerJson(values)).then((player) => {
            handleModifyPlayer(player)
        }, error => {
            setModifyLoading(false);
            handleError(error)
        });
    };

    const onUpdate = (values: any) => {
        setModifyLoading(true);
        Api.updatePlayer(playerFormToPlayerJson(values)).then((player) => {
            handleModifyPlayer(player)
        }, error => {
            setModifyLoading(false);
            handleError(error)
        });
    };

    const handleModifyPlayer = (player: any) => {
        props.mode == Mode.Create && form.resetFields();
        // Callbacks call for update parent
        props.callbackModalVisibility && props.callbackModalVisibility(false)
        props.updateParentList && props.updateParentList();

        // App notification
        notifyApp("Create player", "The player (" + player.name + ") n°" + player.id + " has been successfully " + (props.mode === Mode.Create ? "created": "updated"));
        setModifyLoading(false);
    }

    return (

        <div>
            <Form
                {...FORM_LAYOUT}
                onFinish={props.mode === Mode.Create ? onFinish : onUpdate}
                form={form}
            >
                {props.mode === Mode.Edit && <Form.Item
                    label="ID"
                    name="id"
                    rules={[{ required: true }]}
                    initialValue={props.player && props.player.id}
                >
                    <Input disabled />
                </Form.Item>}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please insert a name!' }]}
                    initialValue={props.player && props.player.name}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...FORM_BUTTON_LAYOUT} labelAlign={"right"}>
                    <Button loading={modifyLoading} type="primary" htmlType="submit">{props.mode === Mode.Create ? 'Add a new player': 'Edit player' }</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PlayerModification;


