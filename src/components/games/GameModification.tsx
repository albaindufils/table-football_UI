import React from "react";


import {Card, Col, Divider, Row, Typography} from "antd";
import {DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";

import Score from "../../commons/components/Score";
import {GameJsonld, TeamJsonld} from "../../commons/model";
import {formatDatetime} from "../../commons/helpers";
import {IActionContainer} from "../../commons/interfaces/IActionContainer";
import {Mode} from "../../commons/enum/ModeEntity";
import TeamsSelect from "../teams/TeamsSelect";

interface IProps extends IActionContainer {
    game: GameJsonld,
    teams: TeamJsonld[]
}


function GameModification(props: IProps) {
    const [game, setGame] = React.useState<GameJsonld>(props.game);
    const [mode, setMode] = React.useState<Mode>(props.mode);

    const updateScoreHome = (score: number) => {
        game.scoreHome = score;
    }

    const updateScoreAway = (score: number) => {
        game.scoreAway = score;
    }

    const saveGame = () => {
        // Validate the rules of the game
        setMode(Mode.Read);
        // Update game
    }

    const renderEditButton = () => {

        return mode === Mode.Read ? <EditOutlined onClick={() => setMode(Mode.Edit)} key="edit" /> : <SaveOutlined onClick={() => saveGame()} key="save" />
    }

    return (
        <Card
            title={<Divider>{formatDatetime(props.game.datetime)}</Divider>}
            actions={[
                renderEditButton(),
                <DeleteOutlined  key="delete" />,
            ]}
        >
            {
                props.game &&
                <Row justify="center" align="middle" className={"text-center div-center"}>
                    <Col span={6}>
                        {mode === Mode.Edit && <TeamsSelect teams={props.teams} initialValue={props.game.teamHome} />}
                        {mode === Mode.Read && <Typography.Title level={5}>{props.game.teamHome}</Typography.Title>}

                    </Col>
                    <Col span={6}>
                        <Score score={props.game.scoreHome} updateScore={updateScoreHome} mode={mode} />
                    </Col>
                    <Col span={6}>
                        <Score score={props.game.scoreAway} updateScore={updateScoreAway} mode={mode} />
                    </Col>
                    <Col span={6}>
                        {mode === Mode.Edit && <TeamsSelect teams={props.teams} initialValue={props.game.teamAway}  />}
                        {mode === Mode.Read && <Typography.Title level={5}>{props.game.teamAway}</Typography.Title>}

                    </Col>
                </Row>

            }
        </Card>

    )
}


export default GameModification;