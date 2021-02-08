import {PlayerJsonld} from "./model";
import {Simulate} from "react-dom/test-utils";


export function playerFormToPlayerJson(playerForm:any) {
    let player = {
        name : playerForm.name
    }
    return player;
}

export function teamFormToTeamJson(teamForm: any) {
    let team = {
        id : teamForm.id,
        name : teamForm.name,
        player1 : teamForm.player1,
        player2 : teamForm.player2
    }
    return team;
}