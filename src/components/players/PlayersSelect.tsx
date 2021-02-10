import {PlayerJsonld} from "../../commons/model";
import {Form, Select} from "antd";
import React from "react";

interface IProps {
    players:PlayerJsonld[],
    initialValue?:string,
    title:string,
    name:string,
    required?:boolean
}
function PlayersSelect(props:IProps) {
    return (
        <Form.Item
            label={props.title}
            name={props.name}
            rules={[{ required: !!props.required, message: props.required ? 'Value required!':'' }]}
            initialValue={props.initialValue && props.initialValue}
        >
            <Select style={{width:'100%'}}>
                {!props.required && <Select.Option value={''} key={''}>Unset player</Select.Option>}
                {props.players && props.players.map((player) =>
                    <Select.Option value={player["@id"]} key={player.id}>{player["@id"]} - {player.name}</Select.Option>
                )}
            </Select>
        </Form.Item>
    )
}

export default PlayersSelect;