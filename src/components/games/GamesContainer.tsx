import React from "react";

import {GameJsonld, TeamJsonld} from "../../commons/model";
import {Card, Modal, Table} from "antd";
import {PlusOutlined, ReloadOutlined} from "@ant-design/icons"
import {Api} from "../../services/api";
import {formatDatetime, handleError} from "../../commons/helpers";
import GameDisplay from "./GameDisplay";
import {Mode} from "../../commons/enum/ModeEntity";
import GamesAddContainer from './GamesAddContainer';
import {ColumnsType} from "antd/es/table";
import {TABLE_DEFAULT_SIZE} from "../../commons/constants";


const tableColumnGames: ColumnsType<GameJsonld> = [
    { title: "ID", key:"id", dataIndex:"id", width:50},
    { title: "Date/time", key:"datetime", dataIndex:"datetime", render: (text, record) => formatDatetime(record.datetime), ellipsis: true},
    { title: "Home team", key:"teamHome", dataIndex:"teamHome", align:"center", render: (text, record) => record.teamHome.id + ' - ' + record.teamHome.name, ellipsis: true },
    { title: "Home score", key:"scoreHome", dataIndex:"scoreHome", align:"center", ellipsis: true},
    { title: "Away score", key:"scoreAway", dataIndex:"scoreAway", align:"center", ellipsis: true },
    { title: "Away team", key:"teamAway", dataIndex:"teamAway", align:"center", render: (text, record) => record.teamAway.id + ' - ' + record.teamAway.name, ellipsis: true }
]
function GamesContainer() {
    const [games, setGames] = React.useState<GameJsonld[]>();
    const [teams, setTeams] = React.useState<TeamJsonld[]>([]);
    const [selectedGame, setSelectedGame] = React.useState<GameJsonld>();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        updateGames();
        Api.getTeams().then(data => {
            setTeams(data["hydra:member"]);
        }, error => {
            handleError(error)
        });
    }, [])



    const updateGames = () => {
        setIsLoading(true);
        Api.getGames().then(data => {
            setGames(data["hydra:member"].sort((g1, g2) => (g2.id as any) - (g1.id as any)));
            setSelectedGame(games?.filter(x => x.id === selectedGame?.id)[0]);
        }, error => {
            handleError(error)
        }).finally(() => setIsLoading(false));
    }

    const renderAddContainer = () => <div>
        <a onClick={() => updateGames()}><ReloadOutlined style={{fontSize:"20px"}} /></a>
        <a onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize:"20px"}} /> Start new game</a>
        <Modal title="Create a new game" footer={null} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} destroyOnClose={true}>
            <GamesAddContainer teams={teams} updateParentList={updateGames} callbackModalVisibility={setIsModalOpen} mode={Mode.Create}  />
        </Modal>
    </div>

    return (
        <Card
            title={games && games.length +  " game(s)"}
            loading={!games}
            extra={renderAddContainer()}
        >
            <Table
                key={'table-players'}
                rowKey={'id'}
                size={"small"}
                columns={tableColumnGames}
                dataSource={games}
                loading={isLoading}
                scroll={{y: TABLE_DEFAULT_SIZE}}
                expandable={{
                    expandedRowRender: record => <GameDisplay key={"edit-game-" + record.id} teams={teams} game={record} mode={Mode.Edit} updateParentList={updateGames} />,
                    expandRowByClick: true
                }}
                pagination={false}
            />
        </Card>
    )
}


export default GamesContainer;