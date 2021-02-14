import React from "react";

import {Button, Card, Col, DatePicker, Divider, Row, Typography} from "antd";

import Score from "../../commons/components/Score";
import {GameJsonld, TeamJsonld} from "../../commons/model";
import {formatDatetime, handleError} from "../../commons/helpers";
import {IActionContainer} from "../../commons/interfaces/IActionContainer";
import {Mode} from "../../commons/enum/ModeEntity";
import {Api} from "../../services/api";
import moment from 'moment';
import TeamsSelect from "../teams/TeamsSelect";

interface IProps extends IActionContainer {
    game: GameJsonld,
    teams: TeamJsonld[]
}

function GameDisplay(props: IProps) {
    const [game, setGame] = React.useState<GameJsonld>(props.game);
    const [scoreHome, setScoreHome] = React.useState(props.game.scoreHome);
    const [scoreAway, setScoreAway] = React.useState(props.game.scoreAway);
    const [teamHomeId, setTeamHomeId] = React.useState(props.game.teamHome["@id"]);
    const [teamAwayId, setTeamAwayId] = React.useState(props.game.teamAway["@id"]);
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
    const [datetime, setDatetime] = React.useState(props.game.datetime);

    const getGamePayload = () => {
        return {
            id: game.id,
            datetime: datetime,
            scoreHome:scoreHome,
            scoreAway:scoreAway,
            teamHome: teamHomeId,
            teamAway: teamAwayId
        }
    }

    const updateTeamHome = (team: string) => {
        setTeamHomeId(team);
    }

    const updateTeamAway = (team: string) => {
        setTeamAwayId(team);
    }

    const updateScoreHome = (score: number) => {
        setScoreHome(score);
    }

    const updateScoreAway = (score: number) => {
        setScoreAway(score);
    }

    const changeDatetime = (time: any, timeString: string) => {
        setDatetime(time.toISOString())
        console.log(time, timeString);
    }

    const saveGame = () => {
        // Validate the rules of the game
        if(props.mode === Mode.Edit) {
            setIsUpdating(true);
            Api.updateGame(getGamePayload()).then(() => {
                props.updateParentList();
                setIsUpdating(false);
            }, error => {
                handleError(error);
                setIsUpdating(false);
            });
        }
    }

    return (
        <Card>
            {
                props.game &&
                <Row justify="center" align="middle" className={"text-center div-center"}>
                    <Col span={24}>
                        <Divider style={{marginTop:'0'}}>
                        {props.mode === Mode.Read && formatDatetime(game.datetime)}
                        {props.mode === Mode.Edit &&
                            <DatePicker bordered={false} size={"small"} showTime defaultValue={moment(game.datetime?.toString())} format={'DD/MM/YYYY, HH:mm'} onChange={changeDatetime} />
                        }
                    </Divider>
                    </Col>

                    <Col span={6}>
                        {props.mode === Mode.Edit && <TeamsSelect key={game.id} teams={props.teams} initialValue={game.teamHome?.["@id"]} required={true} title={"Team home"} name={"teamHome"} onChange={updateTeamHome} />}
                        {props.mode === Mode.Read && <Typography.Title level={5}>{game.teamHome}</Typography.Title>}

                    </Col>
                    <Col span={6}>
                        <Score
                            key={"scorehome-" + (props.mode === Mode.Read ? "read-" : "edit-") + game.id}
                            score={props.mode === Mode.Read ? props.game.scoreHome : scoreHome}
                            updateScore={updateScoreHome}
                            mode={props.mode} />
                    </Col>
                    <Col span={6}>
                        <Score score={props.mode === Mode.Read ? props.game.scoreAway: scoreAway} updateScore={updateScoreAway} mode={props.mode} />
                    </Col>
                    <Col span={6}>
                        {props.mode === Mode.Edit && <TeamsSelect key={game.id} teams={props.teams} initialValue={game.teamAway?.["@id"]} required={true} title={"Team away"} name={"teamAway"} onChange={updateTeamAway} />}
                        {props.mode === Mode.Read && <Typography.Title level={5}>{game.teamAway}</Typography.Title>}

                    </Col>
                    {props.mode === Mode.Edit && <>
                        <Col span={6} style={{textAlign:'left'}}>
                            <Button loading={isUpdating} onClick={() => saveGame()} type="primary" htmlType="submit">{'Save game'}</Button>
                        </Col>
                        <Col span={18}></Col>
                    </>}
                </Row>

            }
        </Card>

    )
}


export default GameDisplay;