import React, {useEffect} from 'react';
import './AuthChoose.scss'
import {Link} from "react-router-dom";
import * as env from '../../../config/env';

const AuthChoose: React.FC = () => {

    useEffect(() => {
        gapi.load('signin2', () => {
            gapi.auth2.init({
                client_id: env.GOOGLE_CLIENT_ID,
            });
            const opts = {
                width: 240,
                height: 50,
                longtitle: true,
                client_id: env.GOOGLE_CLIENT_ID,
                onSuccess: onLoginSuccess,
                onFailure: onLoginFailed
            };
            gapi.signin2.render('google-login-button', opts)
        })
    });

    const onLoginSuccess = () => {
        console.log('Login success');
    };

    const onLoginFailed = (err: any) => {
        console.log('Login failed', err);
    };

    const logout = async () => {
        gapi.load('auth2', () => {
            const auth2 = gapi.auth2.init({
                client_id: env.GOOGLE_CLIENT_ID,
            });
            auth2.then(async () => {
                auth2.signOut()
            });
        });
    };

    return (
        <div className={"container auth-container"}>

            <h1 className={"center-align"}>Bienvenue</h1>

            <div className="row center-align">
                <div id="google-login-button" className={"google-button"}>Login with Google</div>
            </div>

            <div className={"row auth-choose-button"}>
                <div className={"col s6 right-align"}>
                    <Link to="/auth/login" className={"btn blue"}>
                        se connecter
                    </Link>
                </div>

                <div className={"col s6"}>
                    <Link to="/auth/register" className={"btn blue"}>
                        créer un compte
                    </Link>
                </div>
            </div>

            <button onClick={logout} className={'btn-small red'}>google logout</button>
        </div>
    );
};

export default AuthChoose;
