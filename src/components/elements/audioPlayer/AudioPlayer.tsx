import React, { useEffect, useState } from 'react';
import 'react-input-range/lib/css/index.css';
import './AudioPlayer.scss';
import Timer from '../timer/Timer';
import { useGameDispatch } from '../../../providers/GameProvider';
import { SET_PAUSE, SET_PLAY } from '../../../config/actions/gameActions';

const mocksTracks = [
  {
    track: "https://cdns-preview-7.dzcdn.net/stream/c-78fed100d8c512d608dae53dee8eff1d-4.mp3",
    timeBefore: 5,
  },
  {
    track: "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-5.mp3",
    timeBefore: 5,
  },
  {
    track: "https://cdns-preview-d.dzcdn.net/stream/c-d0989d5eb8e4a5cadbeef21a432ec10a-1.mp3",
    timeBefore: 5,
  },
  {
    track: "https://cdns-preview-4.dzcdn.net/stream/c-4e9a119a71bf4596ebf44230129a5025-4.mp3",
    timeBefore: 5,
  },
];

const DEFAULT_TRACK_TIME = 30;

const AudioPlayer: React.FC = () => {
  const [track, setTrack] = useState<string>('');
  const [player, setPlayer] = useState<HTMLAudioElement|null>(null);
  const [duration, setDuration] = useState<number>(DEFAULT_TRACK_TIME);
  const [onComplete, setOnComplete] = useState<Function|null>(null);
  const dispatch = useGameDispatch();

  const playTrack = () => {
    if (player) {
      player.play();
      setDuration(Math.trunc(player.duration));
      // eslint-disable-next-line no-use-before-define
      setOnComplete(() => fetchNextTrack);
      dispatch({ type: SET_PLAY });
    }
  };

  const fetchNextTrack = async () => {
    // TODO: Request to get new track
    dispatch({ type: SET_PAUSE });
    if (!track) {
      setTrack(mocksTracks[0].track);
      setOnComplete(() => playTrack);
      setDuration(mocksTracks[0].timeBefore);
    } else {
      const randomIndex = Math.floor(Math.random() * mocksTracks.length) + 1;
      setTrack(mocksTracks[randomIndex].track);
      setDuration(mocksTracks[randomIndex].timeBefore);
      setOnComplete(() => playTrack);
    }
  };

  /* TODO: Listen websocket
    On GameSongStart: Set track, Set waiting time duration, st callback to play song
  */

  useEffect(() => {
    if (player) {
      fetchNextTrack();
    }
  }, [player]);

  // useEffect(() => {
  //   if (player) {
      // player.addEventListener('durationchange', () => {
      //   player.play();
      //   setDuration(Math.trunc(player.duration));
      //   setOnComplete(null);
      // });

      // player.addEventListener('ended', () => {
      //   setDuration(10);
      //   setOnComplete(() => fetchNextTrack);
      // });
    // }
  // }, [player]);

  useEffect(() => {
    if (player && track.trim().length > 0) {
      player.src = track;
    }
  }, [player, track]);

  return (
    <>
      <audio
        controls
        ref={(ref) => setPlayer(ref)}
        preload="metadata"
        className="hide"
        muted
      >
        <source src="https://cdns-preview-7.dzcdn.net/stream/c-78fed100d8c512d608dae53dee8eff1d-4.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Timer duration={duration} onComplete={() => { if (onComplete) onComplete(); }} />
    </>
  );
};

export default AudioPlayer;
