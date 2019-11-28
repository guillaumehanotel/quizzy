import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useGlobalState, useStore } from '../../storeProvider';
import { User } from '../../models/User';
import { LOGIN_SUCCESS, LOGOUT } from '../../config/actions';

const Header: React.FC = () => {
  const state = useGlobalState();
  const dispatch = useStore();

  useEffect(() => {
    if (state.user === null) {
      let localStorageUser = localStorage.getItem('user')
      if (localStorageUser !== null) {
        const user: User = JSON.parse(localStorageUser)
        dispatch({ type: LOGIN_SUCCESS, payload: user })
      }
    }
  }, [])

  return (
    <nav className="z-depth-1">
      <div className="nav-wrapper">
        <Link to="/" className="left">
          <div className="valign-wrapper">
            <img src="assets/quizzy.png" className="logo" alt="quizzy logo" />
            <span className="logo-text w500">QUIZZY</span>
          </div>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down valign-wrapper">
          <li>
            <Link to={state.isLogged ? "/stats" : "/login"}>
              <span className="connexion-link w500">{state.isLogged ? "Mes stats" : "Se connecter / S'enregistrer"}</span>
            </Link>
          </li>
          {state.isLogged ?
            <li>
              <Link to={"/"} onClick={() => dispatch({ type: LOGOUT })}>
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
