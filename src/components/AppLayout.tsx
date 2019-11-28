import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import './AppLayout.scss';
import Header from './header/Header';
import Home from '../pages/home/Home';
import { StoreProvider, useGlobalState } from '../storeProvider';
import Login from "../pages/auth/login/Login";
import AuthChoose from "../pages/auth/authchoose/AuthChoose";
import Register from "../pages/auth/register/Register";

const AppLayout: React.FC = () => {
    const state = useGlobalState();
    
    return (
        <Router>
            <StoreProvider>
                <div id="main-content">
                    <Header />

                    <Switch>
                        <Route exact path="/"><Home/></Route>
                        <Route exact path="/login" render={() =>
                                localStorage.getItem('user') ? (
                                    <Redirect to={{ pathname: "/" }} />
                                ) : <Login/>
                            }
                        />
                        <Route exact path="/register" render={() =>
                                localStorage.getItem('user') ? (
                                    <Redirect to={{ pathname: "/" }} />
                                ) : <Register/>
                            }
                        />
                    </Switch>

                </div>
            </StoreProvider>
        </Router>
    );
};

export default AppLayout;
