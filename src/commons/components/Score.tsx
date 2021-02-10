import {Col, Progress, Row, Typography} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import {Mode} from "../enum/ModeEntity";
import {MAX_SCORE} from "../constants";


interface IProps {
    score:number,
    updateScore: (score: number) => void,
    mode: Mode
}

function Score(props: IProps) {
    const [score, setScore] = React.useState(props.score);

    React.useEffect(() => {
        props.updateScore(score);
    }, [score])

    const addScore = () => {
        if(score < 7) {
            setScore(score + 1);
        }
    }

    const suppScore = () => {
        if(score > 0) {
            setScore(score - 1);
        }
    }

    return (
        <>
            <Row justify="center" align="top">
                <Col>
                    {props.mode === Mode.Edit && <Typography.Link disabled={!(score < MAX_SCORE)} href="#"><PlusOutlined  onClick={() => addScore()}/></Typography.Link>}
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col>
                    <Progress type="circle" percent={score/MAX_SCORE*100} width={60} format={() => '' + score} />
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col>
                    {props.mode === Mode.Edit && <Typography.Link disabled={!(score > 0)} href="#"><MinusOutlined disabled={score > 0} onClick={() => suppScore()} /></Typography.Link>}
                </Col>
            </Row>
        </>
    )
}

export default Score;