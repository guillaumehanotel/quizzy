import React, { createContext, useContext, useReducer } from 'react';
import { NullPresenceChannel, PresenceChannel } from 'laravel-echo/src/channel/index';
import * as actions from '../config/actions/gameActions';
import { Result } from '../models/Game';
import { STATUS } from '../config/game';

type stateType = {
  genreId: number | string;
  isPlaying: boolean;
  track: string;
  channel: PresenceChannel | NullPresenceChannel | null;
  gameHistory: Result[];
  status: STATUS;
}

const defaultState: stateType = {
  genreId: 0,
  isPlaying: false,
  track: '',
  channel: null,
  gameHistory: [],
  status: STATUS.NOTHING,
};

type Action = { type: string; payload?: any; }
type State = typeof defaultState;

const reducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case actions.SET_GENRE:
      return { ...state, genreId: action.payload };
    case actions.SET_CHANNEL:
      return { ...state, channel: action.payload };
    case actions.SET_PLAY:
      return { ...state, isPlaying: true };
    case actions.SET_PAUSE:
      return { ...state, isPlaying: false };
    case actions.SET_TRACK:
      return { ...state, track: action.payload };
    case actions.ADD_SONG_TO_HISTORY:
      const result = action.payload;
      result.status = state.status === STATUS.NOTHING ? STATUS.FAIL : state.status;
      return { ...state, gameHistory: [...state.gameHistory, result] };
    case actions.SET_STATUS:
      return { ...state, currentStatus: action.payload };
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
