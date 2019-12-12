import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useUserState, useUserDispatch } from '../../providers/UserProvider';
import { LOGIN_SUCCESS, LOGOUT } from '../../config/actions/userActions';
import { ROUTES } from '../../config/routes';
import { me, userLogout } from '../../utils/requests';

/**
 * Display the header of the site.
 */
const Header: React.FC = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const [localStorageToken] = useState(localStorage.getItem('token'));

  const fetchUser = async (token: string) => {
    const user = await me(token);
    dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
  };

  // Auto log the user if token exist on local storage.
  useEffect(() => {
    if (state.token === null && state.user === null) {
      if (localStorageToken !== null && localStorageToken !== 'undefined') {
        fetchUser(localStorageToken);
      }
    }
  }, [localStorageToken]);

  const logout = async () => {
    localStorage.removeItem('token');
    if (state.token !== null) {
      await userLogout(state.token);
    }
    dispatch({ type: LOGOUT });
  };

  return (
    <nav className="z-depth-1">
      <div className="nav-wrapper">
        <Link to={ROUTES.HOME} className="left">
          <div className="valign-wrapper">
            <img src="/assets/quizzy.png" className="logo" alt="quizzy logo" />
            <span className="logo-text w500">QUIZZY</span>
          </div>
        </Link>
        <ul id="nav-mobile" className="right hide-on-small-and-down valign-wrapper">
          <li>
            <Link to={state.isLogged ? ROUTES.STATS : ROUTES.LOGIN}>
              <span className="connexion-link w500">
                {state.isLogged ? 'Mes stats' : 'Se connecter / S\'enregistrer'}
              </span>
            </Link>
          </li>
          {
            state.isLogged
              ? (
                <li>
                  <Link to={ROUTES.HOME} onClick={() => logout()}>
                    <span className="connexion-link w500">Déconnexion</span>
                  </Link>
                </li>
              )
              : null
          }
        </ul>
      </div>
    </nav>
  );
};

export default Header;
