import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ROUTES } from '../config/routes';
import './AppLayout.scss';
import { GameProvider } from '../providers/GameProvider';
import { UserProvider } from '../providers/UserProvider';
import Header from './header/Header';
import Home from '../pages/home/Home';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import Game from '../pages/game/Game';
import Stats from '../pages/stats/Stats';

const AppLayout: React.FC = () => (
  <Router>
    <UserProvider>
      <div id="main-content">
        <Header />

        <Switch>
          <Route exact path={ROUTES.HOME}><Home /></Route>
          <Route
            exact
            path={ROUTES.LOGIN}
            render={() => (localStorage.getItem('token')
              ? <Redirect to={{ pathname: '/' }} />
              : <Login />)}
          />
          <Route
            exact
            path={ROUTES.REGISTER}
            render={() => (localStorage.getItem('token')
              ? <Redirect to={{ pathname: '/' }} />
              : <Register />)}
          />
          <Route
            exact
            path={ROUTES.GAME}
            render={() => (!localStorage.getItem('token')
              ? <Redirect to={{ pathname: '/' }} />
              : <GameProvider><Game /></GameProvider>)}
          />
          <Route
            exact
            path={ROUTES.STATS}
            render={() => (!localStorage.getItem('token')
              ? <Redirect to={{ pathname: '/' }} />
              : <Stats />)}
          />
        </Switch>

      </div>
    </UserProvider>
  </Router>
);

export default AppLayout;
