import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {ROUTES} from "../config/routes";
import './AppLayout.scss';
import {StoreProvider} from '../storeProvider';
import Header from './header/Header';
import Home from '../pages/home/Home';
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Game from "../pages/game/Game";

const AppLayout: React.FC = () => {
    return (
        <Router>
            <StoreProvider>
                <div id="main-content">
                    <Header/>

                    <Switch>
                        <Route exact path={ROUTES.HOME}><Home/></Route>
                        <Route exact path={ROUTES.LOGIN}><Login/></Route>
                        <Route exact path={ROUTES.REGISTER}><Register/></Route>
                        <Route exact path={ROUTES.GAME}><Game/></Route>
                        {/*<Route exact path={ROUTES.STATS}></Route>*/}
                    </Switch>

                </div>
            </StoreProvider>
        </Router>
    );
};

export default AppLayout;
