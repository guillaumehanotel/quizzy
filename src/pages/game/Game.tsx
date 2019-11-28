import React from 'react';
import { useParams } from 'react-router-dom';
import SoundWaves from '../../components/elements/soundWaves/SoundWaves';
import GameInput from '../../components/forms/GameInput/GameInput';
import AudioIndicator from '../../components/elements/audioIndicator/AudioIndicator';

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
          <SoundWaves enable />
          <GameInput />
        </div>

       <AudioIndicator track={"https://cdns-preview-7.dzcdn.net/stream/c-78fed100d8c512d608dae53dee8eff1d-4.mp3"} />
      </div>

      <div className="col m3">
        classement
      </div>
    </div>
  );
};

export default Game;
