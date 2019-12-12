import React, { useEffect, useState } from 'react';
import './Results.scss';
import Result from '../../elements/Result/Result';
import { useGameState } from '../../../providers/GameProvider';

const Results: React.FC = () => {
  const { gameHistory, isPlaying, order } = useGameState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (order) {
      setProgress(10 * (order - 1));
    }
  }, [order]);

  const getResultHistory = (resultIndex) => (
    gameHistory.find((history) => history.order === (resultIndex + 1))
  );

  const isResultPlaying = (resultIndex) => isPlaying && order !== 0 && order === resultIndex + 1;

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
