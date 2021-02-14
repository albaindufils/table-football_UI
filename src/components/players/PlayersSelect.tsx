import {PlayerJsonld} from "../../commons/model";
import {Form, Select} from "antd";
import React from "react";
import {ISelectProps} from "../../commons/interfaces/ISelectProps";

interface IProps extends ISelectProps {
    players:PlayerJsonld[]
}
function PlayersSelect(props:IProps) {
    return (
        <Form.Item
            label={props.title}
            name={props.name}
            rules={[{ required: !!props.required, message: props.required ? 'Value required!':'' }]}
            initialValue={props.initialValue && props.initialValue}
        >
            <Select style={{width:'100%'}} placeholder={props.placeholder}>
                {!props.required && <Select.Option value={''} key={''}>-</Select.Option>}
                {props.players && props.players.map((player) =>
                    <Select.Option value={player["@id"]} key={player.id}>{player.id} - {player.name}</Select.Option>
                )}
            </Select>
        </Form.Item>
    )
}

export default PlayersSelect;