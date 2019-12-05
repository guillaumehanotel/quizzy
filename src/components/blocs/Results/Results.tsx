import React from 'react';
import Result from '../../elements/Result/Result';

const Results: React.FC = () => {
  return (
    <div>
      {
        [...Array(10).keys()].map((key) => (
          // <Result
          //   status={}
          //   artist={}
          //   title={}
          //   isPlaying={}
          // />
          result
        ))
      }
    </div>
  );
};

export default Results;
