import React from "react";

import {TeamJsonld} from "../../commons/model";
import {Select} from "antd";

interface IProps {
    teams:TeamJsonld[],
    initialValue?: string
}
function TeamsSelect(props:IProps) {
    return (
        <Select

        >
            {props.teams && props.teams.map((team) =>
                <Select.Option value={team["@id"]} key={team.id}>{team["@id"]} - {team.name}</Select.Option>
            )}
        </Select>
    )
}

export default TeamsSelect;