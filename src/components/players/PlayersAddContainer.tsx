import {Alert, Button, Form, Input} from "antd";
import React from "react";
import {playerFormToPlayerJson} from "../../commons/mappers";
import {Api} from "../../services/api";
import {PlayerJsonld} from "../../commons/model";

interface IProps {
    updatePlayerList?: () => void
}

function PlayersAddContainer(props: IProps) {
    const [form] = Form.useForm();
    const [hasError, setHasError] = React.useState(false);
    const [playerAdded, setPlayerAdded] = React.useState<PlayerJsonld | undefined>();

    const onFinish = (values: any) => {
        setPlayerAdded(undefined);
        Api.addPlayer(playerFormToPlayerJson(values)).then((player) => {
            setPlayerAdded(player);
            setHasError(false);
            form.resetFields();
            props.updatePlayerList && props.updatePlayerList();
        }, error => {
            setHasError(true);
            console.log('response', Object.assign({}, error));
        });
        console.log('Success:', values);
    };

    return (

        <div>
            <Form
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label="Player name"
                    name="name"
                    rules={[{ required: true, message: 'Please insert a name!' }]}
                    initialValue={""}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{float:"right"}}>Add new player</Button>
                </Form.Item>
            </Form>
            {hasError && <Alert message="An error occure with the API." type="error" />}
            {playerAdded && <Alert message={"The player '" + playerAdded.name + "' has been added with success."} type="success" />}
        </div>
    )
}

export default PlayersAddContainer;


