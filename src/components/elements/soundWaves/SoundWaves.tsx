import React from 'react';
import './SoundWaves.scss';

type Props = {
  enable: boolean;
};

const SoundWaves: React.FC<Props> = ({ enable }) => (
  <div className="sound-waves-container col">
    <div className={`sound-waves ${enable ? 'animate' : ''}`}>
      {
        [...Array(10).keys()].map((key) => (
          <div className="sound-bar" key={`sound_bar_${key}`} />
        ))
      }
    </div>
  </div>
);

export default SoundWaves;
