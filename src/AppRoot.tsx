import React from "react";
import {Api} from "./services/api";
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import HeaderNavigation from "./commons/components/HeaderNavigation";
import {Route, Switch} from "react-router";
import {GameJsonld, PlayerJsonld, TeamJsonld} from "./commons/model";
import HomeContainer from "./components/HomeContainer";
import TeamsContainer from "./components/teams/TeamsContainer";
import GamesContainer from "./components/games/GamesContainer";
import PlayersContainer from "./components/players/PlayersContainer";

export interface IRoutes {
    component: any,
    exactMatch?: boolean,
    label: string,
    path: string,
    routePath?: string,
    displayMenu?: boolean
}

function AppRoot() {

    const [routes] = React.useState<IRoutes[]>([
        { path: '/', component: <HomeContainer /> , label: 'Home', exactMatch: true, displayMenu:true },
        { path: '/teams', component: <TeamsContainer  />, label: 'Teams', exactMatch: true, displayMenu:true },
        { path: '/games', component: <GamesContainer />, label: 'Games', exactMatch: true, displayMenu:true },
        { path: '/players', component: <PlayersContainer />, label: 'Players', exactMatch: true, displayMenu:true },
        // { path: '/players/add', component: <PlayersAddContainer />, label: 'Add players', exactMatch: false, displayMenu:true  },
        // { path: '/players/edit/:playerId', component: <PlayersAddContainer />, label: 'Add players', exactMatch: false }
    ])

    React.useEffect(() => {
        Api.init()
    }, [])

    return (
        <Layout>
            <Header className={"header-container"}>
                <HeaderNavigation menu={routes} />
            </Header>
            <Content className={"content-container"}>
                <Switch>
                    {routes && routes.map((route) => {
                        return (
                            <Route exact key={route.path} path={route.path}>
                                {route.component}
                            </Route>
                        )
                    })}
                </Switch>
            </Content>
        </Layout>
    );
}

export default AppRoot;