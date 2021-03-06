import React from 'react';
import './SoundWaves.scss';
import { useGameState } from '../../../providers/GameProvider';

/**
 * Animated component to simulate sound waves.
 */
const SoundWaves: React.FC = () => {
  const { isPlaying } = useGameState();

  return (
    <div className="sound-waves-container">
      <div className={`sound-waves ${isPlaying ? 'animate' : ''}`}>
        {
          [...Array(10).keys()].map((key) => (
            <div className="sound-bar" key={`sound_bar_${key}`}/>
          ))
        }
      </div>
    </div>
  );
};

export default SoundWaves;
