import React from "react";

import {TeamJsonld} from "../../commons/model";
import {Card, Table} from "antd";
import {Api} from "../../services/api";
import {ColumnsType} from "antd/es/table";
import TeamsEditContainer from "./TeamModificationContainer";
import TeamModificationContainer from "./TeamModificationContainer";
import {Mode} from "../../commons/enum/ModeEntity";

function TeamsContainer() {
    const title = "Teams"
    const [teams, setTeams] = React.useState<TeamJsonld[]>();
    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        updateTeamList()

    }, [])
    const updateTeamList = () => {
        setLoading(true)
        Api.getTeams().then(data => {
            setTeams(data["hydra:member"]);
            setLoading(false);
        });
    }

    const tableColumn: ColumnsType<TeamJsonld> = [
        { title: "ID", key:"id", dataIndex:"id", width: 50},
        { title: "Name", key:"name", dataIndex:"name"},
        { title: "Player 1", key:"player1", dataIndex:"player1"},
        { title: "Player 2", key:"player2", dataIndex:"player2"},
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
            title={title}
            loading={!teams}
        >
            <Table
                key={'table-teams'}
                rowKey={'id'}
                scroll={{y: 500}}
                columns={tableColumn}
                dataSource={teams}
                loading={isLoading}
                expandable={{
                    expandedRowRender: record => <TeamModificationContainer updateTeamList={updateTeamList} mode={Mode.Edit} team={record} />
                }}
                pagination={false} />
            <TeamModificationContainer updateTeamList={updateTeamList} mode={Mode.Create} />
        </Card>
    )
}


export default TeamsContainer;