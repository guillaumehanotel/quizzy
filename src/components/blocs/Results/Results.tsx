import React, { useEffect, useState } from 'react';
import './Results.scss';
import Result from '../../elements/Result/Result';
import { useGameState } from '../../../providers/GameProvider';

const Results: React.FC = () => {
  const { gameHistory, isPlaying } = useGameState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(10 * gameHistory.length);
  }, [gameHistory]);

  const getResultHistory = (resultIndex) => (
    gameHistory.find((history) => history.order === (resultIndex + 1))
  );

  const isResultPlaying = (resultIndex) => (
    isPlaying
    && gameHistory.length > 0
    && gameHistory[gameHistory.length - 1].order !== 0
    && resultIndex === gameHistory[gameHistory.length - 1].order
  );

  return (
    <div className="list-results">
      {
        [...Array(10).keys()].map((el, i) => {
          const resultHistory = getResultHistory(i);

          return (
            <Result
              artist={resultHistory ? resultHistory.artist : undefined}
              title={resultHistory ? resultHistory.title : undefined}
              status={resultHistory ? resultHistory.status : undefined}
              isPlaying={isResultPlaying(i)}
              index={i}
              key={`result_history_${i}`}
            />
          );
        })
      }
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Results;
