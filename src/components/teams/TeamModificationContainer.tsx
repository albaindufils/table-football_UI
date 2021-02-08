import React from "react";

import {PlayerJsonld, TeamJsonld} from "../../commons/model";
import {Alert, Button, Form, Input, Select, Spin} from "antd";
import {Api} from "../../services/api";
import './Teams.css';
import PlayersAddContainer from "../players/PlayersAddContainer";
import {Mode} from "../../commons/enum/ModeEntity";
import {teamFormToTeamJson} from "../../commons/mappers";

interface IProps {
    updateTeamList: () => void,
    team?:TeamJsonld,
    mode: Mode
}

function TeamModificationContainer(props: IProps) {
    const [form] = Form.useForm();
    const [players, setPlayers] = React.useState<PlayerJsonld[]>([]);
    const [teamAdded, setTeamAdded] = React.useState<TeamJsonld | undefined>();
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [hasError, setHasError] = React.useState(false);


    React.useEffect(() => {
        setLoading(true);
        Api.getPlayers().then((data) => {
            setPlayers(data['hydra:member']);
            setLoading(false);
        }, (error) => {
            setHasError(true);
        });
    },[props.team])

    const onUpdate = (values: any) => {
        console.log(values);
        Api.updateTeam(teamFormToTeamJson(values)).then((team) => {
            props.updateTeamList();
            // form.resetFields();
        })
        console.log('Success:', values);
    };
    const onCreate = (values: any) => {
        Api.addTeam(teamFormToTeamJson(values)).then((team) => {
            setTeamAdded(team);
            props.updateTeamList();
            form.resetFields();
        })
        console.log('Success:', values);
    };
    const onFinishFailed = (values: any) => {
        console.log('Failed:', values);
    };
    return (
        <div>
        {isLoading
            ? <div className="team-edit-container"><Spin /></div>
            :
            <Form
                onFinish={props.mode === Mode.Create ? onCreate : onUpdate}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                {props.mode === Mode.Edit && <Form.Item
                    label="ID"
                    name="id"
                    initialValue={props.team && props.team.id}
                >
                    <Input disabled={true} />
                </Form.Item>}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    initialValue={props.team && props.team.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Player 1"
                    name="player1"
                    rules={[{ required: true, message: "Value required!" }]}
                    initialValue={props.team && props.team.player1}
                >
                    <Select>
                        {players && players.map((player) =>
                            <Select.Option value={player["@id"]} key={player.id}>{player["@id"]} - {player.name}</Select.Option>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <PlayersAddContainer />
                        </div>
                    </Select>

                </Form.Item>
                <Form.Item
                    label="Player 2"
                    name="player2"
                    rules={[{ required: true, message: "Value required!" }]}
                    initialValue={props.team && props.team.player2}
                >
                    <Select >
                        {players && players.map((player) =>
                            <Select.Option value={player["@id"]} key={player.id}>{player["@id"]} - {player.name}</Select.Option>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <PlayersAddContainer />
                        </div>
                    </Select>

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{props.mode === Mode.Create ? 'Add a new team': 'Edit team' }</Button>
                </Form.Item>

            </Form>
        }
            {hasError && <Alert message="An error occure with the API." type="error" />}
            {teamAdded && <Alert message={"The player '" + teamAdded.name + "' has been added with success."} type="success" />}
        </div>
    )
}


export default TeamModificationContainer;