import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';

type Props = {
  duration: number;
  onComplete: Function;
}

let interval: any;

/**
 * Display a time bar with a counter.
 */
const Timer: React.FC<Props> = (props) => {
  const { duration, onComplete } = props;
  const [counter, setCounter] = useState<number>(duration);
  const [value, setValue] = useState<number>(0);

  // Handle timer et counter progression.
  useEffect(() => {
    if (duration) {
      clearInterval(interval);
      setValue(0);
      setCounter(duration);
      let i = 0;

      interval = setInterval(() => {
        i += 10;

        if (i % 100 === 0) {
          setCounter((count) => count - 1);
        }

        setValue((v) => (v + 0.1 >= duration ? v : v + 0.1));
      }, 100);
    }
  }, [duration]);

  // Callback at the end of the timer.
  useEffect(() => {
    if (counter === 0) {
      clearInterval(interval);
      onComplete();
    }
  }, [counter]);

  return (
    <div className="row audio-player mt-3 mb-5">
      <div className="form col s9">
        <InputRange
          minValue={0}
          maxValue={duration}
          value={value}
          draggableTrack={false}
          formatLabel={() => ''}
          onChange={() => null}
        />
      </div>

      <span className="col s3 right-align">
        {`${counter} ${counter > 1 ? 'secondes' : 'seconde'}`}
      </span>
    </div>
  );
};

export default Timer;
