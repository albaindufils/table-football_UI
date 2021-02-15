import React from "react";

import {TeamJsonld} from "../../commons/model";
import {Card, Modal, Table} from "antd";
import {PlusOutlined, ReloadOutlined, FundOutlined} from '@ant-design/icons';
import {Api} from "../../services/api";
import {ColumnsType} from "antd/es/table";
import TeamsModification from "./TeamsModification";
import {Mode} from "../../commons/enum/ModeEntity";
import {handleError} from "../../commons/helpers";
import {TABLE_DEFAULT_SIZE} from "../../commons/constants";
import {Link} from "react-router-dom";

function TeamsContainer() {
    const [teams, setTeams] = React.useState<TeamJsonld[]>();
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [isModal, setIsModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        updateTeamList()

    }, [])

    const updateTeamList = () => {
        setLoading(true)
        Api.getTeams().then(data => {
            setTeams(data["hydra:member"]);
        }, error => {
            handleError(error);
            setLoading(false);
        }).finally(() => setLoading(false));
    }

    const renderExtraEditContainer = () => {
        return (
            <div>
                <a onClick={() => updateTeamList()}><ReloadOutlined style={{fontSize:"20px"}} /></a>
                <a onClick={() => setIsModal(true)}><PlusOutlined style={{fontSize:"20px"}} /></a>
                <Modal title="Create a new team" footer={null} visible={isModal} onCancel={() => setIsModal(false)} destroyOnClose={true}>
                    <TeamsModification updateParentList={updateTeamList} callbackModalVisibility={setIsModal} mode={Mode.Create} />
                </Modal>
            </div>
        )
    }

    const tableColumn: ColumnsType<TeamJsonld> = [
        { title: "ID", key:"id", dataIndex:"id", width: 50, sorter: (a, b) => (a.id as any) - (b.id as any), defaultSortOrder:'descend'},
        { title: "Name", key:"name", dataIndex:"name", ellipsis: true},
        { title: "Player 1", key:"player1", dataIndex:"player1", render:(value, record) => record.player1.id + ' - ' + record.player1.name, ellipsis: true},
        { title: "Player 2", key:"player2", dataIndex:"player2", render:(value, record) => record.player2 && (record.player2?.id + ' - ' + record.player2?.name), ellipsis: true},
        {
            title: "Statistics",
            key:"action",
            width: 100,
            render: (text, record) => {
                return (
                    <div>
                        <Link to={'/stats/teams/' + record.id }><FundOutlined /></Link>
                    </div>
                )
            }
        }
    ];

    return (
        <Card
            title={teams && teams.length +  " team(s)"}
            loading={!teams}
            extra={renderExtraEditContainer()}
        >
            <Table
                key={'table-teams'}
                rowKey={'id'}
                size={"small"}
                scroll={{y: TABLE_DEFAULT_SIZE}}
                columns={tableColumn}
                dataSource={teams}
                loading={isLoading}
                expandable={{
                    expandedRowRender: record => <TeamsModification updateParentList={updateTeamList} mode={Mode.Edit} team={record} />,
                    expandRowByClick: true
                }}
                pagination={false} />

        </Card>
    )
}


export default TeamsContainer;