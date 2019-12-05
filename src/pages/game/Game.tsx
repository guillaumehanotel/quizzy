import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Echo from 'laravel-echo';
import { useUserState } from '../../providers/UserProvider';
import { DEV_WEBSOCKET_URL } from '../../config/env';
import { useGameDispatch } from '../../providers/GameProvider';
import { SET_CHANNEL } from '../../config/actions/gameActions';
import './Game.scss';
import SoundWaves from '../../components/elements/SoundWaves/SoundWaves';
import GameInput from '../../components/forms/GameInput/GameInput';
import AudioPlayer from '../../components/elements/AudioPlayer/AudioPlayer';
import GenreBanner from '../../components/elements/GenreBanner/GenreBanner';
import Ranking from '../../components/blocs/Ranking/Ranking';
import History from '../../components/blocs/History/History';
import Results from '../../components/blocs/Results/Results';

// @ts-ignore
window.io = require('socket.io-client');

const Game: React.FC = () => {
  const { genreId } = useParams();
  const userState = useUserState();
  const dispatch = useGameDispatch();

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
    <div className="row">
      <div className="col m3">
        <History />
      </div>

      <div className="col m6">
        <GenreBanner genreId={genreId || ''} />

        <div className="input-container">
          <SoundWaves />
          <GameInput />
        </div>

        <AudioPlayer />
        <Results />
      </div>

      <div className="col m3">
        <Ranking />
      </div>
    </div>
  );
};

export default Game;
