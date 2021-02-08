import { Menu } from "antd";
import {Link, useLocation} from "react-router-dom";
import {IRoutes} from "../../AppRoot";

interface IProps {
    menu: IRoutes[]
}

function HeaderNavigation(props: IProps) {
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[useLocation().pathname]}>
            {props.menu && props.menu.map((m) =>
            {
                return m.displayMenu && <Menu.Item key={m.path}><Link to={m.path}>{m.label}</Link></Menu.Item>
            }
            )}
        </Menu>
    )
}

export default HeaderNavigation;