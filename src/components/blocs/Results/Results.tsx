import React, { useState } from 'react';
import './Results.scss';
import Result from '../../elements/Result/Result';

const Results: React.FC = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="list-results">
      {
        [...Array(10).keys()].map((el, index) => (
          <Result
            index={index}
          />
        ))
      }
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Results;

