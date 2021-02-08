import React from "react";
import TeamsContainer from "./teams/TeamsContainer";
import GamesContainer from "./games/GamesContainer";
import PlayersContainer from "./players/PlayersContainer";
import {Col, Row} from "antd";
import {GameJsonld, PlayerJsonld, TeamJsonld} from "../commons/model";

function HomeContainer() {


    return (
            <Row gutter={8}>
                <Col span={8}>
                    <PlayersContainer />
                </Col>
                <Col span={8}>
                    <TeamsContainer />
                </Col>
                <Col span={8}>
                    <GamesContainer />
                </Col>

            </Row>


    )
}

export default HomeContainer;