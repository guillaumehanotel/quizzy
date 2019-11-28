import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import {ROUTES} from "../config/routes";
import './AppLayout.scss';
import Header from './header/Header';
import Home from '../pages/home/Home';
import { StoreProvider, useGlobalState } from '../storeProvider';
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Game from "../pages/game/Game";

const AppLayout: React.FC = () => {
    const state = useGlobalState();

    return (
        <Router>
            <StoreProvider>
                <div id="main-content">
                    <Header />

                    <Switch>
                        <Route exact path={ROUTES.HOME}><Home /></Route>
                        <Route exact path={ROUTES.LOGIN} render={() =>
                            localStorage.getItem('token') ? (
                                <Redirect to={{ pathname: "/" }} />
                            ) : <Login />
                        }
                        />
                        <Route exact path={ROUTES.REGISTER} render={() =>
                            localStorage.getItem('user') ? (
                                <Redirect to={{ pathname: "/" }} />
                            ) : <Register />
                        }
                        />
                        <Route exact path={ROUTES.GAME}><Game/></Route>
                        <Route exact path={ROUTES.STATS}><Home/></Route>
                    </Switch>

                </div>
            </StoreProvider>
        </Router>
    );
};

export default AppLayout;