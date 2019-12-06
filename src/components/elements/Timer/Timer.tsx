import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import { useGameState } from '../../../providers/GameProvider';
import { User } from '../../../models/User';
import { EVENTS } from '../../../config/channelEvents';
import { PresenceChannel } from 'laravel-echo/dist/channel';

type Props = {
  duration: number;
  onComplete: Function;
}

let interval: any;

const Timer: React.FC<Props> = (props) => {
  const { duration, onComplete } = props;
  const { channel, isPlaying, track } = useGameState();
  const [counter, setCounter] = useState<number>(duration);
  const [value, setValue] = useState<number>(0);
  // const [joiningListener, setJoiningListener] = useState<PresenceChannel|null>(null);

  // useEffect(() => {
  //   if (channel) {
  //     setJoiningListener(
  //       channel.joining(() => {
  //         console.log(counter);
  //
  //         // @ts-ignore
  //         channel.whisper(EVENTS.CURRENT_TIMER, {
  //           currentTimer: counter,
  //           track: isPlaying ? track : '',
  //         });
  //       }),
  //     );
  //   }
  // }, [channel, isPlaying, track, counter]);

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

  useEffect(() => {
    if (counter === 0) {
      clearInterval(interval);
      onComplete();
    }
  }, [counter]);

  return (
    <div className="row audio-player">
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
