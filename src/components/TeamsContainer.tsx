import React from "react";
import {Api} from "../services/api";
import {TeamJsonld} from "../commons/model";


function TeamsContainer() {
    const [teams, setTeams] = React.useState<TeamJsonld[]>();

    React.useEffect(() => {
        Api.getTeams().then(data => {
            setTeams(data["hydra:member"]);
        })
    }, [])
    return (
        <ul>
            {teams && teams.map(team =>
            <li>{team.id} - {team.name} ({team.player1}{team.player2 && ", " + team.player2})</li>
            )}
        </ul>
    )
}


export default TeamsContainer;