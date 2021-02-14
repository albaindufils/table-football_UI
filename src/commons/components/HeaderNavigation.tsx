import { Menu } from "antd";
import {NavLink, useLocation} from "react-router-dom";
import {IRoutes} from "../../AppRoot";

interface IProps {
    menu: IRoutes[]
}

function HeaderNavigation(props: IProps) {
    return (
        <Menu theme="dark" mode="horizontal" selectedKeys={[useLocation().pathname]}>
            {props.menu && props.menu.map((m) =>
            {
                return m.displayMenu && <Menu.Item key={m.path}><NavLink to={m.path} activeClassName={"select"}>{m.label}</NavLink></Menu.Item>
            }
            )}
        </Menu>
    )
}

export default HeaderNavigation;