import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';
import {useGlobalState, useStore} from '../../storeProvider';
import {LOGIN_SUCCESS, LOGOUT} from '../../config/actions';
import {me, userLogout} from "../../utils/requests";

const Header: React.FC = () => {
    const state = useGlobalState();
    const dispatch = useStore();
    const [localStorageToken] = useState(localStorage.getItem('token'));

    const fetchUser = async (token: string) => {
        const user = await me(token);
        dispatch({type: LOGIN_SUCCESS, payload: {user, token}})
    };

    const logout = async () => {
        localStorage.clear();
        if (state.token !== null) {
            // @ts-ignore
            await userLogout(state.token);
        }
        dispatch({type: LOGOUT})
    };

    useEffect(() => {
        if (state.token === null && state.user === null) {
            if (localStorageToken !== null && localStorageToken !== 'undefined') {
                fetchUser(localStorageToken);
            }
        }
    }, [localStorageToken]);

    return (
        <nav className="z-depth-1">
            <div className="nav-wrapper">
                <Link to="/" className="left">
                    <div className="valign-wrapper">
                        <img src="assets/quizzy.png" className="logo" alt="quizzy logo"/>
                        <span className="logo-text w500">QUIZZY</span>
                    </div>
                </Link>
                <ul id="nav-mobile" className="right hide-on-small-and-down valign-wrapper">
                    <li>
                        <Link to={state.isLogged ? "/stats" : "/login"}>
                            <span
                                className="connexion-link w500">{state.isLogged ? "Mes stats" : "Se connecter / S'enregistrer"}</span>
                        </Link>
                    </li>
                    {state.isLogged ?
                        <li>
                            <Link onClick={logout} to={"/"}>
                                <span className="connexion-link w500">Déconnexion</span>
                            </Link>
                        </li>
                        : null}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
