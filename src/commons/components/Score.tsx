import {Col, Progress, Row, Typography} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import {Mode} from "../enum/ModeEntity";
import {MAX_SCORE} from "../constants";
import {Spin} from "antd/es";


interface IProps {
    score: number,
    updateScore: (score: number) => void,
    mode: Mode,
    isUpdating?: boolean
}

function Score(props: IProps) {
    // const [score, setScore] = React.useState(props.score);

    const addScore = () => {
        if(props.score < 7) {
            props.updateScore(props.score + 1);
        }
    }

    const suppScore = () => {
        if(props.score > 0) {
            props.updateScore(props.score - 1);
        }
    }

    return (
        <>
            <Row justify="center" align="top">
                <Col>
                    {props.mode === Mode.Edit && <Typography.Link disabled={!(props.score < MAX_SCORE)} href="#"><PlusOutlined  onClick={() => addScore()}/></Typography.Link>}
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col>
                    <Progress type="circle" percent={props.score/MAX_SCORE*100} width={60} format={() => '' + props.score} />
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col>
                    {props.mode === Mode.Edit && <Typography.Link disabled={!(props.score > 0)} href="#"><MinusOutlined disabled={props.score > 0} onClick={() => suppScore()} /></Typography.Link>}
                </Col>
            </Row>
        </>
    )
}

export default Score;