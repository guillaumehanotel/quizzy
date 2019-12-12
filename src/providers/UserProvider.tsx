import React, { createContext, useReducer, useContext } from 'react';
import * as actions from '../config/actions/userActions';
import { User } from '../models/User';

type stateType = {
  isLogged: boolean;
  loading: boolean;
  error: boolean;
  user: User | null;
  token: string | null;
  hasJustRegistered: boolean;
};

const defaultState: stateType = {
  isLogged: false,
  loading: false,
  error: false,
  user: null,
  token: null,
  hasJustRegistered: false,
};

type Action = { type: string; payload?: any; }
type State = typeof defaultState;

function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, loading: true, error: false };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        isLogged: true,
        error: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case actions.LOGIN_FAILURE:
      return { ...state, loading: false, error: true };
    case actions.LOGOUT:
      return {
        ...state,
        loading: false,
        isLogged: false,
        error: false,
        user: null,
        token: null,
      };
    case actions.HAS_JUST_REGISTERED:
      return {
        ...state,
        hasJustRegistered: action.payload,
      };
    default:
      return state;
  }
}

const stateCtx = createContext(defaultState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const UserProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  );
};

export const useUserState = () => useContext(stateCtx);
export const useUserDispatch = () => useContext(dispatchCtx);
