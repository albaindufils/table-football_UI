import {Menu} from "antd";
import {
    Link
} from "react-router-dom";

interface IProps {
    changeMenu: (e: any) => void
}


function HeaderNavigation(props: IProps) {

    return (
        <Menu theme="dark" onClick={props.changeMenu} mode="horizontal" defaultSelectedKeys={['teams']}>
            <Menu.Item key="teams"><Link to={"/teams"}>Teams</Link></Menu.Item>
            <Menu.Item key="players"><Link to={"/players"}>Players</Link></Menu.Item>
            <Menu.Item key="games"><Link to={"/games"}>Games</Link></Menu.Item>
        </Menu>
    )
}

export default HeaderNavigation;