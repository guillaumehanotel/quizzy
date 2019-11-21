import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useGlobalState } from '../../storeProvider';

const Header: React.FC = () => {
  const state = useGlobalState();

  return (
    <nav className="z-depth-1">
      <div className="nav-wrapper">
        <Link to="/" className="left">
          <div className="valign-wrapper">
            <img src="assets/quizzy.png" className="logo" />
            <span className="logo-text">QUIZZY</span>
          </div>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down valign-wrapper">
          <li>
            <Link to="/login">
              <span className="connexion-link">{state.isLogged ? "Mon compte" : "Se connecter / S'enregistrer"}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;