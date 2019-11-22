import React from 'react';
import './Login.scss'
import useForm from "react-hook-form";
import {Link} from "react-router-dom";
import {loginUser} from "../../../utils/requests";


const Login: React.FC = () => {

    const {handleSubmit, register, errors} = useForm();

    const onSubmit = async (values: any) => {
        const response = await loginUser(values);
        const user = response.data;
        const bearerToken = response.meta.access_token;
        console.log(user);
        console.log(bearerToken);
    };


    return (
        <div className={"container login-container"}>

            <h1 className={"center-align"}>Se Connecter</h1>

            <div className="row">
                <form className="col s12" onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-field col s8 offset-s2 m4 offset-m4">
                        <input placeholder="Email" name="email" type="text" className="validate"
                               ref={register({
                                   required: 'Required',
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                       message: "invalid email address"
                                   }
                               })}/>
                        {errors.email && errors.email.message}
                    </div>

                    <div className="input-field col s8 offset-s2 m4 offset-m4">
                        <input placeholder="Mot de passe" name="password" type="password" className="validate"
                               ref={register({
                                   required: 'Required',
                               })}/>
                        {errors.password && errors.password.message}
                    </div>

                    <div className="input-field col s6 right-align">
                        <button className="btn blue" type="submit" name="action">Valider</button>
                    </div>
                    <div className="input-field col s6 valign-wrapper register-link">
                        <Link to="/auth/register">Pas encore de compte ?</Link>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default Login;
