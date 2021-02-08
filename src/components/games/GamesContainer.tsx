import React from "react";
import {GameJsonld} from "../../commons/model";
import {Card} from "antd";
import {Api} from "../../services/api";


function GamesContainer() {
    const title = "Games";
    const [games, setGames] = React.useState<GameJsonld[]>();
    React.useEffect(() => {
        Api.getGames().then(data => {
            setGames(data["hydra:member"]);
            console.log(games);
        })
    }, [])
    return (
        <Card
            title={title}
            loading={!games}
        >
            {games && games.map(game => <span key={game.id}>{game.id} - {game.datetime} - {game.teamHome} vs {game.teamAway}</span>)}
        </Card>
    )
}


export default GamesContainer;