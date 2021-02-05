import React from "react";

import {Api} from "../services/api";
import {PlayerJsonld} from "../commons/model";
import nProgress from "nprogress";


function PlayersContainer() {
    const [players, setPlayers] = React.useState<PlayerJsonld[]>();

    React.useEffect(() => {
        Api.getPlayers().then(data => {
            setPlayers(data["hydra:member"]);
        })
    }, [])
    return (
        <ul>
            {players && players.map(player =>
                <li>{player.id} - {player.name}</li>
            )}
        </ul>
    )
}


export default PlayersContainer;