import React, {useState} from 'react';
import './Login.scss'
import useForm from "react-hook-form";
import {Link} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import {fetchUserByGoogleId, loginUser, storeUser} from "../../../utils/requests";
import * as env from '../../../config/env';
import * as actions from '../../../config/actions';
import {useStore} from '../../../storeProvider';
import {FormValidationError, UnauthorizedError} from "../../../utils/errors";
import {useHistory} from "react-router-dom";
import {User} from "../../../models/User";

const Login: React.FC = () => {

    const history = useHistory();
    const dispatch = useStore();
    const [isPasswordVisible, togglePasswordVisibility] = useState(false);
    const {handleSubmit, register, errors, setError} = useForm();

    const onSubmit = async (values: any) => {
        try {
            const {user, token} = await loginUser(values);
            dispatch({type: actions.LOGIN_SUCCESS, payload: {user, token}});
            history.push('/');
        } catch (e) {
            if (e instanceof UnauthorizedError) {
                setError('email', "unknown", e.message)
            } else if (e instanceof FormValidationError) {
                setError(e.getErrors())
            }
        }
    };

    const onGoogleLoginSuccess = async (googleResponse: any) => {
        const googleUser: User = {
            email: googleResponse['profileObj']['email'],
            name: googleResponse['profileObj']['name'],
            googleId: googleResponse['profileObj']['googleId'],
            lastname: googleResponse['profileObj']['familyName'],
            firstname: googleResponse['profileObj']['givenName'],
            avatarUrl: googleResponse['profileObj']['imageUrl'],
        };
        let {user, token} = await fetchUserByGoogleId(googleUser.googleId);
        if (user === null) {
            ({user, token} = await storeUser(googleUser));
        }
        dispatch({type: actions.LOGIN_SUCCESS, payload: {user, token}});
        history.push('/');
    };

    const onGoogleLoginFailed = (err: any) => {
        console.log('Login failed', err);
    };

    return (
        <div className={"login-container valign-wrapper m-auto z-depth-1"}>
            <div className={"full-width"}>
                <h1 className={"center-align w500"}>Se Connecter</h1>

                <div className="row">
                    <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col s7 m4 l3 m-auto input-field float-none">
                                <input placeholder="Email" name="email" type="text" autoComplete="email"
                                       className="z-depth-1 browser-default full-width"
                                       ref={register({
                                           required: 'Required',
                                           pattern: {
                                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                               message: "invalid email address"
                                           }
                                       })}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s7 m4 l3 m-auto input-field float-none">
                                <input placeholder="Mot de passe" name="password" autoComplete="password"
                                       type={isPasswordVisible ? "text" : "password"}
                                       className="z-depth-1 browser-default full-width"
                                       ref={register({
                                           required: 'Required',
                                       })}/>
                                <img onClick={() => togglePasswordVisibility(!isPasswordVisible)}
                                     className={"password-toggler"} src="./assets/view.png" alt="toggle-pwd"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s4 m-auto float-none">
                                <div className="row">
                                    <div className="col s12 m5">
                                        <button className="btn quizzy-blue" type="submit" name="action">Valider</button>
                                    </div>
                                    <div className="col s12 m7 valign-wrapper register-link center-align">
                                        <Link to="/register">Pas encore de compte ?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors.email && errors.email.message}
                    </form>

                    <div className="row">
                        <div className="col s3 m-auto float-none center-align google-connect">
                            <GoogleLogin
                                clientId={env.GOOGLE_CLIENT_ID}
                                buttonText="Se connecter avec Google"
                                onSuccess={onGoogleLoginSuccess}
                                onFailure={onGoogleLoginFailed}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
