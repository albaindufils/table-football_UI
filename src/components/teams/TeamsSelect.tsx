import {TeamJsonld} from "../../commons/model";
import {Select} from "antd";
import React from "react";
import {ISelectProps} from "../../commons/interfaces/ISelectProps";

interface IProps extends ISelectProps {
    teams:TeamJsonld[],

}
function TeamsSelect(props:IProps) {
    return (
        <Select
            style={{width:'100%'}}
            placeholder={props.placeholder}
            defaultValue={props.initialValue && props.initialValue}
            onChange={(value) => props.onChange && props.onChange(value)}
        >
            {!props.required && <Select.Option value={''} key={''}>Unset team</Select.Option>}
            {props.teams && props.teams.map((team) =>
                <Select.Option value={team["@id"]} key={team.id}>{team.id} - {team.name}</Select.Option>
            )}
        </Select>
    )
}

export default TeamsSelect;