import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Echo from 'laravel-echo';
import { useUserState } from '../../providers/UserProvider';
import { DEV_WEBSOCKET_URL } from '../../config/env';
import { useGameDispatch } from '../../providers/GameProvider';
import { SET_CHANNEL, SET_GENRE } from '../../config/actions/gameActions';
import './Game.scss';
import SoundWaves from '../../components/elements/SoundWaves/SoundWaves';
import GameInput from '../../components/forms/GameInput/GameInput';
import AudioPlayer from '../../components/elements/AudioPlayer/AudioPlayer';
import GenreBanner from '../../components/elements/GenreBanner/GenreBanner';
import Ranking from '../../components/blocs/Ranking/Ranking';
import History from '../../components/blocs/History/History';
import Results from '../../components/blocs/Results/Results';
import GameMessage from '../../components/elements/GameMessage/GameMessage';
import Podium from '../../components/blocs/Podium/Podium';

// @ts-ignore
window.io = require('socket.io-client');

const Game: React.FC = () => {
  const { genreId } = useParams();
  const userState = useUserState();
  const dispatch = useGameDispatch();

  useEffect(() => {
    dispatch({ type: SET_GENRE, payload: genreId });
  }, [genreId]);

  useEffect(() => {
    if (userState.token) {
      const echo = new Echo({
        broadcaster: 'socket.io',
        host: DEV_WEBSOCKET_URL,
        auth: {
          headers: {
            Authorization: `Bearer ${userState.token}`,
          },
        },
      });

      const channel = echo.join(`quizz-${genreId}`);
      dispatch({ type: SET_CHANNEL, payload: channel });

      return () => echo.leave(`quizz-${genreId}`);
    }
  }, [userState]);

  return (
    <>
      <div className="game row">
        <div className="col m3">
          <History />
        </div>

        <div className="col m6">
          <GenreBanner />

          <div className="input-container">
            <SoundWaves />
            <GameInput />
          </div>

          <AudioPlayer />
          <Results />
          <GameMessage />
        </div>

        <div className="col m3">
          <Ranking />
        </div>
      </div>

      <Podium />
    </>
  );
};

export default Game;
