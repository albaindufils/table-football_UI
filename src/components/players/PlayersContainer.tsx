import React from "react";

import {Api} from "../services/api";
import {PlayerJsonld} from "../commons/model";
import {Card} from "antd";


function PlayersContainer() {
    const [players, setPlayers] = React.useState<PlayerJsonld[]>();

    React.useEffect(() => {
        Api.getPlayers().then(data => {
            setPlayers(data["hydra:member"]);
        })
    }, [])
    return (
        <Card
            title="Players"
            extra={<a href="#">More</a>}>
            <ul>
                {players && players.map(player =>
                    <li>{player.id} - {player.name}</li>
                )}
            </ul>
        </Card>

    )
}

export default PlayersContainer;


