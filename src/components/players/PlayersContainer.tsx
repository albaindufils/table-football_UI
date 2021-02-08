import React from "react";

import {PlayerJsonld} from "../../commons/model";
import {Card, Table} from "antd";
import {Api} from "../../services/api";
import {ColumnsType} from "antd/es/table";
import PlayersAddContainer from "./PlayersAddContainer";


function PlayersContainer() {
    const [players, setPlayers] = React.useState<PlayerJsonld[]>();
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        updateTable();
    }, []);

    const updateTable = () => {
        setLoading(true);
        Api.getPlayers().then(data => {
            setPlayers(data["hydra:member"].sort());
            setLoading(false);
        })
    }
    const tableColumn: ColumnsType<PlayerJsonld> = [
        { title: "ID", key:"id", dataIndex:"id", width: 70, defaultSortOrder:'ascend'},
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
            title="Players"
            loading={!players}
        >
            <Table
                key={'table-players'}
                rowKey={'id'}
                columns={tableColumn}
                dataSource={players}
                scroll={{y: 300}}
                loading={loading}
                expandable={{
                    // expandedRowRender: record => <TeamsEditContainer team={record} />
                }}
                pagination={false}
            />
            <br/>
            <PlayersAddContainer updatePlayerList={updateTable} />

        </Card>


    )
}

export default PlayersContainer;



