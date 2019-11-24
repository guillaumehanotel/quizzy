import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './AppLayout.scss';
import Header from './header/Header';
import Home from '../pages/home/Home';
import {StoreProvider} from '../storeProvider';
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Room from "../pages/room/Room";

const AppLayout: React.FC = () => {
    return (
        <Router>
            <StoreProvider>
                <div id="main-content">
                    <Header/>

                    <Switch>
                        <Route exact path="/"><Home/></Route>
                        <Route exact path="/login"><Login/></Route>
                        <Route exact path="/register"><Register/></Route>
                        <Route exact path="/room/:id"><Room/></Route>
                    </Switch>

                </div>
            </StoreProvider>
        </Router>
    );
};

export default AppLayout;
