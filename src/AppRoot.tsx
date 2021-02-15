import React from "react";
import {Api} from "./services/api";
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import HeaderNavigation from "./commons/components/HeaderNavigation";
import {Route, Switch} from "react-router";
import HomeContainer from "./components/HomeContainer";
import TeamsContainer from "./components/teams/TeamsContainer";
import GamesContainer from "./components/games/GamesContainer";
import PlayersContainer from "./components/players/PlayersContainer";
import TeamsStatistics from "./components/stats/StatisticsContainer";
import DashboardContainer from "./components/dashboard/DashboardContainer";

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
        { path: '/dashboard', component: <div className={"single-container"}><DashboardContainer /></div>, label: 'Ranking', exactMatch: true, displayMenu: true },
        { path: '/players', component: <div className={"single-container"}><PlayersContainer /></div>, label: 'Players', exactMatch: true, displayMenu:true },
        { path: '/teams', component: <div className={"single-container"}><TeamsContainer  /></div>, label: 'Teams', exactMatch: true, displayMenu:true },
        { path: '/games', component: <div className={"single-container"}><GamesContainer /></div>, label: 'Games', exactMatch: true, displayMenu:true },
        { path: '/stats/:type/:id', component: <div className={"single-container"}><TeamsStatistics /></div>, label: 'Comparison', exactMatch: false, displayMenu: false },
    ])

    React.useEffect(() => {
        Api.init()
    }, [])

    return (
        <Layout className={"root-content"}>
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