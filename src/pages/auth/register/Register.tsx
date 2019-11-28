import React from 'react';
import './Register.scss'
import useForm from "react-hook-form";
import * as actions from '../../../config/actions';
import { registerUser } from "../../../utils/requests";
import { FormValidationError } from "../../../utils/errors";
import { useStore } from "../../../storeProvider";
import { useHistory } from "react-router";


const Register: React.FC = () => {

    const history = useHistory();
    const { handleSubmit, register, errors, setError } = useForm();
    const dispatch = useStore();

    const onSubmit = async (values: any) => {
        try {
            const { user, token } = await registerUser(values);
            dispatch({ type: actions.LOGIN_SUCCESS, payload: { user, token } });
            history.push('/');
        } catch (e) {
            if (e instanceof FormValidationError) {
                setError(e.getErrors())
            }
        }
    };

    return (
        <div className={"register-container valign-wrapper m-auto z-depth-1"}>
            <div className="full-width">
                <h1 className={"center-align w500"}>S'enregistrer</h1>

                <div className="row">
                    <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col s10 m3 m-auto input-field float-none">
                                <input placeholder="Pseudo" name="name" type="text" className="z-depth-1 browser-default full-width"
                                    ref={register({
                                        required: 'Le pseudo est obligatoire',
                                        validate: value => value !== "admin" || "Nice try!"
                                    })} />
                                {errors.name && errors.name.message}
                            </div>
                        </div>

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
                                <input placeholder="Mot de passe" name="password" type="password" className="z-depth-1 browser-default full-width"
                                    ref={register({
                                        required: 'Le mot de passe est obligatoire',
                                    })} />
                                {errors.password && errors.password.message}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s"></div>
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
        </div>
    );
};

export default Register;
