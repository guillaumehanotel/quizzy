import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ROUTES } from '../config/routes';
import './AppLayout.scss';
import { UserProvider } from '../providers/UserProvider';
import Header from './header/Header';
import Home from '../pages/home/Home';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import Game from '../pages/game/Game';
import { GameProvider } from '../providers/GameProvider';

const AppLayout: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <div id="main-content">
          <Header />

          <Switch>
            <Route exact path={ROUTES.HOME}><Home /></Route>
            <Route exact path={ROUTES.LOGIN}><Login /></Route>
            <Route exact path={ROUTES.REGISTER}><Register /></Route>
            <Route path={ROUTES.GAME}>
              <GameProvider>
                <Game />
              </GameProvider>
            </Route>
            {/*<Route exact path={ROUTES.STATS}></Route>*/}
          </Switch>

        </div>
      </UserProvider>
    </Router>
  );
};

export default AppLayout;
