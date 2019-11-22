import React, { createContext, useReducer, useContext } from 'react';
import * as actions from './config/actions';

type State = typeof defaultState;

type Action = { type: string; payload?: any; }

const defaultState = {
  isLogged: false,
  loading: false,
  error: false
};

function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, loading: true, error: false };
    case actions.LOGIN_SUCCESS:
      return { ...state, loading: false, isLogged: true, error: false };
    case actions.LOGIN_FAILURE:
      return { ...state, loading: false, error: true };
    case actions.LOGOUT:
      return { ...state, loading: true, error: false };
    case actions.LOGOUT_SUCCESS:
      return { ...state, loading: false, isLogged: false, error: false };
    case actions.LOGOUT_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

const stateCtx = createContext(defaultState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const StoreProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  );
};

export const useGlobalState = () => useContext(stateCtx);

export const useStore = () => useContext(dispatchCtx);
