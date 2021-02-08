import {Alert, Button, Form, Input} from "antd";
import React from "react";
import {playerFormToPlayerJson, teamFormToTeamJson} from "../../commons/mappers";
import {Api} from "../../services/api";
import {PlayerJsonld, TeamJsonld} from "../../commons/model";

interface IProps {
    updateTeamList : () => void
}

function TeamsAddContainer(props: IProps) {
    const [form] = Form.useForm();
    const [hasError, setHasError] = React.useState(false);
    const [teamAdded, setTeamAdded] = React.useState<TeamJsonld | undefined>();

    const onFinish = (values: any) => {
        setTeamAdded(undefined);
        Api.addTeam(teamFormToTeamJson(values)).then((team:TeamJsonld) => {
            setTeamAdded(team);
            setHasError(false);
            form.resetFields();
            props.updateTeamList();
        }, error => {
            setHasError(true);
            console.log('response', Object.assign({}, error));
        }).catch(response => {
            console.log(response);
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
                    label="Team name"
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
            {teamAdded && <Alert message={"The team '" + teamAdded.name + "' has been added with success."} type="success" />}
        </div>
    )
}

export default TeamsAddContainer;


