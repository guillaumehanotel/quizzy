import React, { useState } from 'react';
import './Login.scss';
import useForm from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { fetchUserByGoogleId, loginUser, storeUser } from '../../../utils/requests';
import * as env from '../../../config/env';
import * as actions from '../../../config/actions/userActions';
import { FormValidationError, UnauthorizedError } from '../../../utils/errors';
import { User } from '../../../models/User';
import { useUserDispatch } from '../../../providers/UserProvider';
import Input from '../../../components/elements/Input/Input';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useUserDispatch();
  const [isPasswordVisible, togglePasswordVisibility] = useState(false);
  const {
    handleSubmit, register, errors, setError,
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const { user, token } = await loginUser(values);
      dispatch({ type: actions.LOGIN_SUCCESS, payload: { user, token } });
      history.push('/');
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        setError('email', 'unknown', e.message);
      } else if (e instanceof FormValidationError) {
        setError(e.getErrors());
      }
    }
  };

  const onGoogleLoginSuccess = async (googleResponse: any) => {
    const googleUser: User = {
      email: googleResponse.profileObj.email,
      name: googleResponse.profileObj.name,
      googleId: googleResponse.profileObj.googleId,
      lastname: googleResponse.profileObj.familyName,
      firstname: googleResponse.profileObj.givenName,
      avatarUrl: googleResponse.profileObj.imageUrl,
    };
    // Trying to retrieve the user with his google ID
    let { user, token } = await fetchUserByGoogleId(googleUser.googleId);
    // If we cannot find it, that's because his not yet created
    if (user === null) {
      ({ user, token } = await storeUser(googleUser));
      dispatch({ type: actions.HAS_JUST_REGISTERED, payload: true });
    }
    dispatch({ type: actions.LOGIN_SUCCESS, payload: { user, token } });
    history.push('/');
  };

  const onGoogleLoginFailed = (err: any) => {
    setError(err.getErrors());
  };

  return (
    <div className="login-container valign-wrapper m-auto z-depth-1">
      <div className="full-width">
        <h1 className="center-align w500">Se Connecter</h1>

        <div className="row">
          <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col s10 m3 m-auto input-field float-none">
                <Input
                  placeholder="Email"
                  name="email"
                  type="text"
                  requiredMessage="L'email est obligatoire"
                  register={register}
                  validationPattern={{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Adresse email invalide',
                  }}
                />
                {errors.email && errors.email.message}
              </div>
            </div>

            <div className="row">
              <div className="col s10 m3 m-auto input-field float-none">
                <Input
                  placeholder="Mot de passe"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  requiredMessage="Le mot de passe est obligatoire"
                  register={register}
                />
                <img
                  onClick={() => togglePasswordVisibility(!isPasswordVisible)}
                  className="password-toggler"
                  src="./assets/view.png"
                />
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
