import React from "react";
import {Api} from "./services/api";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import HeaderNavigation from "./components/HeaderNavigation";
import {Route, Switch} from "react-router";
import GamesContainer from "./components/GamesContainer";
import PlayersContainer from "./components/PlayersContainer";
import TeamsContainer from "./components/TeamsContainer";



function AppRoot() {
    const clickMenu = (e:any) => {
        console.log(e)
    }
    React.useEffect(() => {


        Api.getGames().then(data => {
            console.log(data["hydra:member"])
        })

        Api.getTeams().then(data => {
            console.log(data["hydra:member"])
        })
    }, [])

    return (
    <Layout>
        <Header className={"header-container"}>
            <HeaderNavigation changeMenu={clickMenu} />
        </Header>
        <Content className={"content-container"}>
            <Switch>
                <Route path="/teams">
                    <TeamsContainer />
                </Route>
                <Route path="/players">
                    <PlayersContainer />
                </Route>
                <Route path="/games">
                    <GamesContainer />
                </Route>
            </Switch>
        </Content>
        {/*<Footer className={"footer-container"}>*/}
        {/*    Footer*/}
        {/*</Footer>*/}
    </Layout>
);
}

export default AppRoot;