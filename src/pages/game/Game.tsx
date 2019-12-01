import React from 'react';
import { useParams } from 'react-router-dom';
import SoundWaves from '../../components/elements/soundWaves/SoundWaves';
import GameInput from '../../components/forms/GameInput/GameInput';
import AudioPlayer from '../../components/elements/audioPlayer/AudioPlayer';
import GenreBanner from '../../components/elements/GenreBanner/GenreBanner';
import './Game.scss';

export enum FOUND {
  FAIL = -1,
  NOTHING = 0,
  ARTIST = 1,
  TITLE = 2,
  ALL = 3,
}

const Game: React.FC = () => {
  // Room id
  const { genreId } = useParams();

  return (
    <div className="row">
      <div className="col m3">
        history
      </div>

      <div className="col m6">
        <GenreBanner genreId={genreId || ''} />

        <div className="input-container">
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
