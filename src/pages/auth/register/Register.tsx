import React from 'react';
import './Register.scss'
import useForm from "react-hook-form";
import {registerUser} from "../../../utils/requests";


const Register: React.FC = () => {

    const {handleSubmit, register, errors} = useForm();

    const onSubmit = async (values: any) => {
        const response = await registerUser(values);
        const user = response.data;
        const bearerToken = response.meta.access_token;
        console.log(user);
        console.log(bearerToken);
    };

    return (
        <div className={"container register-container"}>

            <h1 className={"center-align"}>S'enregistrer</h1>

            <div className="row">
                <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-field col s8 offset-s2 m4 offset-m4">
                        <input placeholder="Pseudo" name="name" type="text" className="validate"
                               ref={register({
                                   required: 'Required',
                                   validate: value => value !== "admin" || "Nice try!"
                               })}/>
                        {errors.name && errors.name.message}
                    </div>

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

                    <div className="input-field col s8 offset-s2 m4 offset-m4">
                        <input placeholder="Confirmation Mot de passe" name="password_confirmation" type="password"
                               className="validate"
                               ref={register({
                                   required: 'Required',
                               })}/>
                        {errors.c_password && errors.c_password.message}
                    </div>

                    <div className="input-field col s6 right-align">
                        <button className="btn cancel-button" type="submit" name="action">Annuler</button>
                    </div>
                    <div className="input-field col s6">
                        <button className="btn blue" type="submit" name="action">Valider</button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default Register;
