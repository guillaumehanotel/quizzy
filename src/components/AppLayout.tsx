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
import {StoreProvider} from '../storeProvider';
import Login from "../pages/auth/login/Login";
import AuthChoose from "../pages/auth/authchoose/AuthChoose";
import Register from "../pages/auth/register/Register";

const AppLayout: React.FC = () => {
    return (
        <Router>
            <StoreProvider>
                <div id="main-content">
                    <Header/>

                    <Switch>
                        <Route exact path="/"><Home/></Route>
                        <Route exact path="/login"><Login/></Route>
                        <Route exact path="/auth"><AuthChoose/></Route>
                        <Route exact path="/auth/login"><Login/></Route>
                        <Route exact path="/auth/register"><Register/></Route>
                    </Switch>

                </div>
            </StoreProvider>
        </Router>
    );
};

export default AppLayout;
