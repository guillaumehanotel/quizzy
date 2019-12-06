import React, { useState } from 'react';
import './Results.scss';
import Result from '../../elements/Result/Result';
import { useGameState } from '../../../providers/GameProvider';

const Results: React.FC = () => {
  const { gameHistory, isPlaying } = useGameState();
  const [progress, setProgress] = useState(0);

  return (
    <div className="list-results">
      {
        [...Array(10).keys()].map((el, i) => (
          <Result
            artist={i < gameHistory.length ? gameHistory[i].artist : null}
            title={i < gameHistory.length ? gameHistory[i].title : null}
            isPlaying={isPlaying && i === gameHistory.length}
            index={i}
            key={`result_history_${i}`}
          />
        ))
      }
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Results;
