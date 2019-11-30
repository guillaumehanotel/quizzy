import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SoundWaves from '../../components/elements/soundWaves/SoundWaves';
import GameInput from '../../components/forms/GameInput/GameInput';
import AudioPlayer from '../../components/elements/audioPlayer/AudioPlayer';
import { GameProvider, useGameDispatch, useGameState } from '../../providers/GameProvider';
import { SET_PLAY } from '../../config/actions/gameActions';

export enum FOUND {
  FAIL = -1,
  NOTHING = 0,
  ARTIST = 1,
  TITLE = 2,
  ALL = 3,
}

const Game: React.FC = () => {
  // Room id
  const { roomId } = useParams();

  return (
    <div className="container row">
      <div className="col m3">
        history
      </div>

      <div className="col m6">
        <div>Dance</div>

        <div className="row">
          <SoundWaves />
          <GameInput />
        </div>

        <AudioPlayer />
      </div>

      <div className="col m3">
        classement
      </div>
    </div>
  );
};

export default Game;
