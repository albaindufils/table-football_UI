import { Menu } from "antd";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../commons/constants";

interface IProps {
    changeMenu: (e: any) => void
}


function HeaderNavigation(props: IProps) {

    return (
        <Menu theme="dark" onClick={props.changeMenu} mode="horizontal" defaultSelectedKeys={[useLocation().pathname]}>
            {ROUTES && ROUTES.map((route) =>
                <Menu.Item key={route.path}><Link to={route.path}>{route.title}</Link></Menu.Item>
            )}
        </Menu>
    )
}


export default HeaderNavigation;