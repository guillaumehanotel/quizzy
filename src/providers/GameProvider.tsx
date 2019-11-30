import React, { createContext, useContext, useReducer } from 'react';
import * as actions from '../config/actions/gameActions';

const defaultState = {
  isPlaying: false,
};

type Action = { type: string; payload?: any; }
type State = typeof defaultState;

const reducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case actions.SET_PLAY:
      return { ...state, isPlaying: true };
    case actions.SET_PAUSE:
      return { ...state, isPlaying: false };
    default:
      return state;
  }
};

const stateCtx = createContext(defaultState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  );
};

export const useGameState = () => useContext(stateCtx);
export const useGameDispatch = () => useContext(dispatchCtx);
