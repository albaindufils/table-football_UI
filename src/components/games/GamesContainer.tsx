import React from "react";
import {Api} from "../services/api";
import {GameJsonld} from "../commons/model";


function GamesContainer() {
    const [games, setGames] = React.useState<GameJsonld[]>();

    React.useEffect(() => {
        Api.getGames().then(data => {
            setGames(data["hydra:member"]);
        })
    }, [])

    return (
        <ul>
            {games && games.map(game =>
                <li>{game.id} - {game.datetime} - {game.teamHome} vs {game.teamAway}</li>
            )}
        </ul>
    )
}


export default GamesContainer;