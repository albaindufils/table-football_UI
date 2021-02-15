import React from "react";

import {PlayerJsonld} from "../../commons/model";
import {Card, Modal, Table} from "antd";
import {Api} from "../../services/api";
import {ColumnsType} from "antd/es/table";
import {PlusOutlined, ReloadOutlined, FundOutlined} from "@ant-design/icons";
import {Mode} from "../../commons/enum/ModeEntity";
import {handleError} from "../../commons/helpers";
import PlayerModification from "./PlayerModification";
import {TABLE_DEFAULT_SIZE} from "../../commons/constants";
import {Link} from "react-router-dom";

function PlayersContainer() {
    const [players, setPlayers] = React.useState<PlayerJsonld[]>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isModal, setIsModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        updateTable();
    }, []);

    const updateTable = () => {
        setLoading(true);
        Api.getPlayers().then(data => {
            setPlayers(data["hydra:member"]);
        }, error => {
            handleError(error)
            setLoading(false);
        }).finally(() => setLoading(false));
    }

    const renderExtraEditContainer = () => <div>
        <a onClick={() => updateTable()}><ReloadOutlined style={{fontSize:"20px"}} /></a>
        <a onClick={() => setIsModal(true)}><PlusOutlined style={{fontSize:"20px"}}   /></a>
                <Modal title="Create a new player" footer={null} visible={isModal} onCancel={() => setIsModal(false)} destroyOnClose={true}>
                    <PlayerModification updateParentList={updateTable} callbackModalVisibility={setIsModal} mode={Mode.Create} />
                </Modal>
            </div>




    const tableColumn: ColumnsType<PlayerJsonld> = [
        { title: "ID", key:"id", dataIndex:"id", width: 70, sorter: (a, b) => (a.id as any) - (b.id as any), defaultSortOrder:'descend'},
        { title: "Name", key:"name", dataIndex:"name"},
        {
            title: "Statistics",
            key:"action",
            width: 100,
            render: (text, record) => {
                return (
                    <div>
                        <Link to={'/stats/players/' + record.id}><FundOutlined /></Link>
                    </div>
                )
            }
        }
    ];

    return (
        <Card
            title={players && players.length +  " player(s)"}
            loading={!players}
            extra={renderExtraEditContainer()}
        >
            <Table
                key={'table-players'}
                rowKey={'id'}
                size={"small"}
                columns={tableColumn}
                dataSource={players}
                scroll={{y: TABLE_DEFAULT_SIZE}}
                loading={loading}
                expandable={{
                    expandedRowRender: record => <PlayerModification player={record} updateParentList={updateTable} mode={Mode.Edit} />,
                    expandRowByClick: true
                }}
                pagination={false}
            />
        </Card>


    )
}

export default PlayersContainer;



