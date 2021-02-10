import React from "react";
import TeamsContainer from "./teams/TeamsContainer";
import GamesContainer from "./games/GamesContainer";
import PlayersContainer from "./players/PlayersContainer";
import {Col, Row} from "antd";
import {GameJsonld, PlayerJsonld, TeamJsonld} from "../commons/model";
import {GUTTER} from "../commons/constants";

function HomeContainer() {


    return (
            <Row gutter={GUTTER}>
                <Col span={10}>
                    <Row gutter={[GUTTER, GUTTER]}>
                        <Col span={24}>
                            <PlayersContainer />
                        </Col>
                        <Col span={24}>
                            <TeamsContainer />
                        </Col>
                    </Row>
                </Col>
                <Col span={14}>
                    <GamesContainer />
                </Col>
            </Row>


    )
}

export default HomeContainer;