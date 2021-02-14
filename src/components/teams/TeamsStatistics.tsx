import {useParams} from "react-router";
import TeamsContainer from "./TeamsContainer";
import {ColumnsType} from "antd/es/table";
import {TeamJsonld} from "../../commons/model";
import {Link} from "react-router-dom";
import React from "react";


function TeamsStatistics() {
    const {id} : any = useParams();
    const tableColumn: ColumnsType<TeamJsonld> = [

    ];
    return(
        <div>
            Statistique for team n°{id}
        </div>
    )

}

export default TeamsStatistics;