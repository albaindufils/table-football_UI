import React from "react";

import {PlayerJsonld, TeamJsonld} from "../../commons/model";
import {Button, Form, Input, Select, Spin} from "antd";
import {Api} from "../../services/api";
import './Teams.css';
import {Mode} from "../../commons/enum/ModeEntity";
import {teamFormToTeamJson} from "../../commons/mappers";
import {handleError, notifyApp} from "../../commons/helpers";
import {FORM_BUTTON_LAYOUT, FORM_LAYOUT} from "../../commons/constants";
import {IActionContainer} from "../../commons/interfaces/IActionContainer";
import PlayersSelect from "../players/PlayersSelect";
import {NotificationType} from "../../commons/enum/NotificationType";


interface IProps extends IActionContainer {
    team?:TeamJsonld
}

function TeamsModification(props: IProps) {
    const [form] = Form.useForm();
    const [players, setPlayers] = React.useState<PlayerJsonld[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [creationLoading, setCreationLoading] = React.useState<boolean>(false);



    React.useEffect(() => {
        setLoading(true);
        Api.getPlayers().then((data) => {
            setPlayers(data['hydra:member']);
            setLoading(false);
        });
    },[props.team])

    const onUpdate = (values: any) => {
        if(!formHasError()) {
            setCreationLoading(true)
            Api.updateTeam(teamFormToTeamJson(values)).then((team) => {
                props.updateParentList();
                notifyApp("Update team (#" + team.id + ")", "The teams '" + team.name + "' has been successfully updated");
                setCreationLoading(false);
            }, (error) => {
                handleError(error);
                setCreationLoading(false);
            })
        }

    };
    const onCreate = (values: any) => {
        if(!formHasError()) {
            setCreationLoading(true);
            Api.addTeam(teamFormToTeamJson(values)).then((team) => {
                props.updateParentList();
                form.resetFields();
                props.callbackModalVisibility && props.callbackModalVisibility(false)
                notifyApp("Create team", "The team (" + team.name + ") n°" + team.id + " has been successfully created");
                setCreationLoading(false);
            }, (error) => {
                setCreationLoading(false);
                handleError(error);
            })
        }
    };

    const formHasError = ():boolean => {
        let hasError = false
        if(form.getFieldValue('player1') === form.getFieldValue('player2')) {
            notifyApp("Form error", "Player1 and player2 are the same. Please correct players you selected!", NotificationType.warning);
            hasError = true;
        }
        return hasError;
    }

    return (
        <div>
        {isLoading
            ? <div className="team-edit-container"><Spin /></div>
            :
            <Form
                {...FORM_LAYOUT}
                onFinish={props.mode === Mode.Create ? onCreate : onUpdate}
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
                <PlayersSelect initialValue={props.team?.player1?.["@id"]} players={players} name={"player1"} required={true} title={"Player 1"} />
                <PlayersSelect initialValue={props.team?.player2?.["@id"]} players={players} name={"player2"} required={false} title={"Player 2"} />
                <Form.Item {...FORM_BUTTON_LAYOUT}>
                    <Button loading={creationLoading} type="primary" htmlType="submit">{props.mode === Mode.Create ? 'Add a new team': 'Edit team' }</Button>
                </Form.Item>

            </Form>
        }
        </div>
    )
}


export default TeamsModification;