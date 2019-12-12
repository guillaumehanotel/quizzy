import React, { useState } from 'react';
import './Register.scss';
import useForm from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as actions from '../../../config/actions/userActions';
import { registerUser } from '../../../utils/requests';
import { FormValidationError } from '../../../utils/errors';
import { ROUTES } from '../../../config/routes';
import { useUserDispatch } from '../../../providers/UserProvider';

/**
 * Register form.
 */
const Register: React.FC = () => {
  const history = useHistory();
  const {
    handleSubmit, register, errors, setError,
  } = useForm();
  const [isPasswordVisible, togglePasswordVisibility] = useState(false);
  const dispatch = useUserDispatch();

  const onSubmit = async (values: any) => {
    try {
      const { user, token } = await registerUser(values);
      dispatch({ type: actions.LOGIN_SUCCESS, payload: { user, token } });
      dispatch({ type: actions.HAS_JUST_REGISTERED, payload: true });
      history.push('/');
    } catch (e) {
      if (e instanceof FormValidationError) {
        setError(e.getErrors());
      }
    }
  };

  return (
    <div className="register-container valign-wrapper m-auto z-depth-1">
      <div className="full-width">
        <h1 className="center-align w500">S'enregistrer</h1>

        <div className="row">
          <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col s10 m3 m-auto input-field float-none">
                <input
                  placeholder="Pseudo"
                  name="name"
                  type="text"
                  className="z-depth-1 browser-default full-width"
                  ref={register({
                    required: 'Le pseudo est obligatoire',
                    validate: (value) => value !== 'admin' || 'Nice try!',
                  })}
                />
                {errors.name && errors.name.message}
              </div>
            </div>

            <div className="row">
              <div className="col s10 m3 m-auto input-field float-none">
                <input
                  placeholder="Email"
                  name="email"
                  type="text"
                  className="z-depth-1 browser-default full-width"
                  ref={register({
                    required: 'L\'email est obligatoire',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
                {errors.email && errors.email.message}
              </div>
            </div>

            <div className="row">
              <div className="col s10 m3 m-auto input-field float-none">
                <input
                  placeholder="Mot de passe"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="z-depth-1 browser-default full-width"
                  ref={register({
                    required: 'Le mot de passe est obligatoire',
                  })}
                />
                <img onClick={() => togglePasswordVisibility(!isPasswordVisible)} className="password-toggler" src="./assets/view.png" />
              </div>
              <div className="col s10 m3 m-auto input-field float-none">
                {errors.password && errors.password.message}
              </div>
            </div>

            <div className="row">
              <div className="col s10 m3 m-auto float-none">
                <div className="col s5 p0">
                  <button className="btn quizzy-blue full-width" type="submit" name="action">Valider</button>
                </div>
                <div className="col s5 offset-s2 p0">
                  <Link to={ROUTES.HOME} className="btn cancel-button full-width">Annuler</Link>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
