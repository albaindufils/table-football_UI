import {useHistory, useParams} from "react-router";
import React from "react";
import {Card, Table} from "antd";
import {TABLE_DEFAULT_SIZE} from "../../commons/constants";
import {GameJsonld} from "../../commons/model";
import {Api} from "../../services/api";
import {formatDatetime, handleError, notifyApp} from "../../commons/helpers";
import {NotificationType} from "../../commons/enum/NotificationType";
import {ColumnsType} from "antd/es/table";



export const tableColumnGames: ColumnsType<GameJsonld> = [
    { title: "ID", key:"id", dataIndex:"id", width:50},
    { title: "Date/time", key:"datetime", dataIndex:"datetime", render: (text, record) => formatDatetime(record.datetime), ellipsis: true},
    { title: "Home team", key:"teamHome", dataIndex:"team_home", align:"center", ellipsis: true},
    { title: "Home score", key:"scoreHome", dataIndex:"score_home", align:"center", ellipsis: true},
    { title: "Away score", key:"scoreAway", dataIndex:"score_away", align:"center", ellipsis: true },
    { title: "Away team", key:"teamAway", dataIndex:"team_away", align:"center", ellipsis: true }
]

function StatisticsContainer() {
    const history = useHistory();
    const {type, id} : any = useParams();
    const [games, setGames] = React.useState<GameJsonld[]>();
    const [isLoading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if(type === "players") {
            setLoading(true);
            Api.getGamesByPlayer(id).then((data) => {
                setGames(data)
            }, error => {
                handleError(error)
            }).finally(() => setLoading(false))

        } else if (type === "teams") {
            setLoading(true);
            Api.getGamesByTeam(id).then((data) => {
                setGames(data)
            }, error => {
                handleError(error)
            }).finally(() => setLoading(false))
        } else {
            notifyApp("Invalid URL", "The url (" + history.location.pathname + ") is not a valid route", NotificationType.warning);
            history.push('/')
        }
    }, [])

    return(
        <>
        <Card
            title={"Games - " + type + " n°" + id}
            loading={!games}
        >
            <Table
                key={'table-teams'}
                rowKey={'id'}
                size={"small"}
                scroll={{y: TABLE_DEFAULT_SIZE}}
                columns={tableColumnGames}
                dataSource={games}
                loading={isLoading}
                pagination={false} />

        </Card>
    </>
    )

}

export default StatisticsContainer;