
export function playerFormToPlayerJson(playerForm:any) {
    let player = {
        id: playerForm.id,
        name : playerForm.name
    }
    return player;
}

export function teamFormToTeamJson(teamForm: any) {
    let team = {
        id : teamForm.id,
        name : teamForm.name,
        player1 : teamForm.player1,
        player2: teamForm.player2 === '' ? null : teamForm.player2
    }
    console.log(team, teamForm);
    return team;
}

export function gameFormToGameJson(gameForm: any) {
    let game = {
        id: gameForm?.id,
        datetime: gameForm.datetime.toISOString(),
        teamHome: gameForm.teamHome,
        teamAway: gameForm.teamAway,
        scoreAway: Number(gameForm.scoreAway),
        scoreHome: Number(gameForm.scoreHome)
    }
    console.log(gameForm, game)
    return game;
}