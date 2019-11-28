import React, { useState } from 'react';
import './Login.scss'
import useForm from "react-hook-form";
import { Link } from "react-router-dom";
import { loginUser } from "../../../utils/requests";
import * as env from '../../../config/env';
import * as actions from '../../../config/actions';
import GoogleLogin from 'react-google-login';
import { User } from '../../../models/User';
import { useStore } from '../../../storeProvider';


const Login: React.FC = () => {

    const [isPasswordVisible, togglePasswordVisibility] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useStore();

    const onSubmit = async (values: any) => {
        const response = await loginUser(values);
        const user = response.data;
        const bearerToken = response.meta.access_token;
        console.log(user);
        console.log(bearerToken);
    };

    const onLoginSuccess = (response: any) => {
        const googleUser = response['profileObj']
        const user: User = { email: googleUser['email'], name: googleUser['name'], googleId: googleUser['googleId'] }
        dispatch({ type: actions.LOGIN_SUCCESS, payload: user })
    };

    const onLoginFailed = (err: any) => {
        console.log('Login failed', err);
    };

    return (
        <div className={"login-container valign-wrapper m-auto z-depth-1"}>
            <div className={"full-width"}>
                <h1 className={"center-align w500"}>Se Connecter</h1>

                <div className="row">
                    <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col s10 m3 m-auto input-field float-none">
                                <input placeholder="Email" name="email" type="text" className="z-depth-1 browser-default full-width"
                                    ref={register({
                                        required: 'L\'email est obligatoire',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "invalid email address"
                                        }
                                    })} />
                                {errors.email && errors.email.message}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s10 m3 m-auto input-field float-none">
                                <input placeholder="Mot de passe" name="password" type={isPasswordVisible ? "text" : "password"} className="z-depth-1 browser-default full-width"
                                    ref={register({
                                        required: 'Le mot de passe est obligatoire',
                                    })} />
                                <img onClick={() => togglePasswordVisibility(!isPasswordVisible)} className={"password-toggler"} src="./assets/view.png" />
                            </div>
                            <div className="col s10 m3 m-auto input-field float-none">
                                {errors.password && errors.password.message}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s10 m3 m-auto float-none">
                                <div className="row">
                                    <div className="col s12 m4">
                                        <button className="btn quizzy-blue" type="submit" name="action">Valider</button>
                                    </div>
                                    <div className="col s12 m8 valign-wrapper register-link">
                                        <Link to="/register">Pas encore de compte ?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col s12 m3 m-auto float-none center-align google-connect">
                            <GoogleLogin
                                clientId={env.GOOGLE_CLIENT_ID}
                                buttonText="Se connecter avec Google"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailed}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
