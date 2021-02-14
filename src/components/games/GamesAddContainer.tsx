import React from "react";
import {IActionContainer} from "../../commons/interfaces/IActionContainer";
import {FORM_BUTTON_LAYOUT, FORM_LAYOUT, MAX_SCORE} from "../../commons/constants";
import {Mode} from "../../commons/enum/ModeEntity";
import {Button, DatePicker, Form, Input} from "antd";
import TeamsSelect from "../teams/TeamsSelect";
import {TeamJsonld} from "../../commons/model";
import {Api} from "../../services/api";
import {handleError, notifyApp} from "../../commons/helpers";
import moment from "moment";
import {gameFormToGameJson} from "../../commons/mappers";

interface IProps extends IActionContainer {
    teams: TeamJsonld[]
}

function GamesAddContainer(props: IProps) {
    const [form] = Form.useForm();
    const [loading, setIsLoading] = React.useState(false)

    const onFinish = (values: any) => {
        setIsLoading(true);
        Api.addGame(gameFormToGameJson(values)).then((game) => {
            notifyApp("Game created", "The game n°" + game.id + " has been successfully created!");
            setIsLoading(false);
            props.updateParentList();
            props.callbackModalVisibility && props.callbackModalVisibility(false);
        }, error => {
            handleError(error);
            setIsLoading(false);
        })
    }
    const controlForm = (form:any) => {
        console.log(form);
    }

    return (
        <Form
            {...FORM_LAYOUT}
            onFinish={onFinish}
            form={form}
            onChange={(form) => controlForm(form)}
        >
            <Form.Item
                label="Game datetime "
                name="datetime"
                rules={[{ required: true }]}
                initialValue={moment()}
            >
                <DatePicker showTime format={'DD/MM/YYYY, HH:mm'} />
            </Form.Item>
            <Form.Item
                label={"Team home"}
                name={"teamHome"}
                rules={[{ required: true }]}
            >
                <TeamsSelect teams={props.teams} required={true} placeholder={"Select a team"} />
            </Form.Item>
            <Form.Item
                label="Score home"
                name="scoreHome"
                rules={[{ required: true, min:0, max:MAX_SCORE }]}
            >
                <Input type={"number"} min={0} max={MAX_SCORE} />
            </Form.Item>
            <Form.Item
                label="Score away"
                name="scoreAway"
                rules={[{ required: true, min:0, max:MAX_SCORE }]}
            >
                <Input type={"number"} min={0} max={MAX_SCORE} />
            </Form.Item>
            <Form.Item
                label={"Team away"}
                name={"teamAway"}
                rules={[{ required: true }]}
            >
                <TeamsSelect teams={props.teams} required={true} placeholder={"Select a team"} />
            </Form.Item>
            <Form.Item {...FORM_BUTTON_LAYOUT} labelAlign={"right"}>
                <Button loading={loading} type="primary" htmlType="submit">Add a new game</Button>
            </Form.Item>
        </Form>
    )

}

export default GamesAddContainer;