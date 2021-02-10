import React from "react";
import {GameJsonld, TeamJsonld} from "../../commons/model";
import {Card, Divider, List, Modal} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import {Api} from "../../services/api";
import './Games.css';
import {formatDatetime, handleError} from "../../commons/helpers";
import GameModification from "./GameModification";
import {Mode} from "../../commons/enum/ModeEntity";
import GamesAddContainer from './GamesAddContainer';

function GamesContainer() {
    const title = "Games";
    const [games, setGames] = React.useState<GameJsonld[]>();
    const [teams, setTeams] = React.useState<TeamJsonld[]>([]);
    const [selectedGame, setSelectedGame] = React.useState<GameJsonld>();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>();

    React.useEffect(() => {
        updateGames();
        Api.getTeams().then(data => {
            setTeams(data["hydra:member"]);
        }, error => {
            handleError(error)
        });
    }, [])

    const updateGames = () => {
        Api.getGames().then(data => {
            setGames(data["hydra:member"].sort((g1, g2) => (g2.id as any) - (g1.id as any)));
        }, error => {
            handleError(error)
        });
    }

    const renderAddContainer = () => <div>
        <a href="#" onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize:"20px"}} /> Start new game</a>
        <Modal title="Create a new player" footer={null} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} destroyOnClose={true}>
            <GamesAddContainer updateParentList={updateGames} callbackModalVisibility={setIsModalOpen} mode={Mode.Create}  />
        </Modal>
    </div>


    return (
        <Card
            title={title}
            loading={!games}
            extra={renderAddContainer()}
        >
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 2
                }}
                dataSource={games}
                renderItem={game => (
                    <List.Item>
                            <GameModification teams={teams} game={game} mode={Mode.Read} updateParentList={updateGames}/>
                            {/*<Modal title="Edit the game" footer={null} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)} destroyOnClose={true}>*/}

                            {/*    <GameModification game={game} mode={Mode.Edit} updateParentList={updateGames} callbackModalVisibility={setIsModalOpen}/>*/}
                            {/*</Modal>*/}
                    </List.Item>
                )}
            />
        </Card>
    )
}


export default GamesContainer;