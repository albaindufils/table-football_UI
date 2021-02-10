import React from "react";

import {PlayerJsonld} from "../../commons/model";
import {Card, Modal, Table} from "antd";
import {Api} from "../../services/api";
import {ColumnsType} from "antd/es/table";
import {PlusOutlined} from "@ant-design/icons";
import {Mode} from "../../commons/enum/ModeEntity";
import {handleError} from "../../commons/helpers";
import PlayerModification from "./PlayerModification";


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
            setLoading(false);
        }, error => {
            handleError(error)
        })
    }

    const renderExtraEditContainer = () => <div>
                <a href="#"><PlusOutlined style={{fontSize:"20px"}}  onClick={() => setIsModal(true)} /></a>
                <Modal title="Create a new player" footer={null} visible={isModal} onCancel={() => setIsModal(false)} destroyOnClose={true}>
                    <PlayerModification updateParentList={updateTable} callbackModalVisibility={setIsModal} mode={Mode.Create} />
                </Modal>
            </div>




    const tableColumn: ColumnsType<PlayerJsonld> = [
        { title: "ID", key:"id", dataIndex:"id", width: 70, sorter: (a, b) => (a.id as any) - (b.id as any), defaultSortOrder:'descend'},
        { title: "Name", key:"name", dataIndex:"name"},
        // {
        //     title: "",
        //     key:"action",
        //     render: (text, record) => {
        //         return (
        //             <div>
        //                 <Link to={'/teams/add/' + record.id}>Edit</Link>
        //             </div>
        //         )
        //     }
        // }
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
                columns={tableColumn}
                dataSource={players}
                scroll={{y: 300}}
                loading={loading}
                expandable={{
                    expandedRowRender: record => <PlayerModification player={record} updateParentList={updateTable} mode={Mode.Edit} />
                }}
                pagination={false}
            />
        </Card>


    )
}

export default PlayersContainer;



