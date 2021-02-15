import React from "react";
import {Card, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {TeamJsonld} from "../../commons/model";
import {TABLE_DEFAULT_SIZE} from "../../commons/constants";
import {Api} from "../../services/api";
import {ReloadOutlined} from "@ant-design/icons";
import {handleError} from "../../commons/helpers";


function DashboardContainer() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState();

    React.useEffect(() => {
        updateRanking();
    }, []);

    const updateRanking = () => {
        setIsLoading(true);
        Api.getStat().then((data) => {
            setData(data);
        }, error => {
            handleError(error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const tableColumn: ColumnsType<TeamJsonld> = [
        { title: "Rank", key:"rank", dataIndex:"rank", width:60, ellipsis: true},
        { title: "Team", key:"team_name", dataIndex:"team_name", ellipsis: true},
        { title: "Games played", key:"gamePlayed", dataIndex:"gamePlayed", align:"center", ellipsis: true},
        { title: "Wins", key:"wins", dataIndex:"wins", align:"center", ellipsis: true},
        { title: "Losses", key:"losses", dataIndex:"losses", align:"center", ellipsis: true},
        { title: "Win Ratio", key:"winRatio", dataIndex:"winRatio", align:"center", ellipsis: true},
        { title: "Goals for", key:"goalsFor", dataIndex:"goalsFor", align:"center", ellipsis: true},
        { title: "Goals against", key:"goalsAgainst", dataIndex:"goalsAgainst", align:"center", ellipsis: true},
        { title: "Goals diff.", key:"goalsDiff", dataIndex:"goalsDiff", align:"center", ellipsis: true}
    ];

    return (
        <div>
            <Card
                title={"Ranking"}
                loading={!data}
                extra={<a onClick={() => updateRanking()}><ReloadOutlined style={{fontSize:"20px"}} /></a>
                }
            >
                <Table
                    key={'teams-stats'}
                    rowKey={'team_id'}
                    size={"small"}
                    scroll={{y: TABLE_DEFAULT_SIZE}}
                    columns={tableColumn}
                    dataSource={data}
                    loading={isLoading}
                    pagination={false}
                />
            </Card>

        </div>
    )
}

export default DashboardContainer;