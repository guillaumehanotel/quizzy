import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './AppLayout.scss';
import Header from './header/Header';
import Home from '../pages/home/Home';
import { StoreProvider } from '../storeProvider';

const AppLayout: React.FC = () => {
  return (
    <Router>
      <StoreProvider>
        <div id="main-content">
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </StoreProvider>
    </Router>
  );
}

export default AppLayout;
