import React, { useEffect, useState } from 'react';
import 'react-input-range/lib/css/index.css';
import './AudioPlayer.scss';
import Timer from '../Timer/Timer';
import { useGameDispatch, useGameState } from '../../../providers/GameProvider';
import { ADD_SONG_TO_HISTORY, SET_PAUSE, SET_PLAY, SET_TRACK } from '../../../config/actions/gameActions';
import { EVENTS } from '../../../config/channelEvents';
import { fetchTrack } from '../../../utils/requests';
import { User } from '../../../models/User';
import { Result } from '../../../models/Game';

type GameStartEvent = {
  duration: number;
}

type Track = {
  track: string;
  pauseDuration: number;
}

const AudioPlayer: React.FC = () => {
  const { channel, genreId } = useGameState();
  const [track, setTrack] = useState<string>('');
  const [player, setPlayer] = useState<HTMLAudioElement|null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [onComplete, setOnComplete] = useState<Function|null>(null);
  const [gameLoading, setGameLoading] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const dispatch = useGameDispatch();

  // TODO: REMOVE IT - For dev (Hot realoading doesn't recreate a new game).
  useEffect(() => {
    if (genreId) {
      fetchNextTrack();
    }
  }, [genreId]);

  /**
   * Websocket events.
   */
  useEffect(() => {
    if (channel) {
      channel.here((channelUsers: User[]) => {
        setIsWaiting(channelUsers.length > 1);
      });

      // @ts-ignore
      channel.listenForWhisper(EVENTS.CURRENT_TIMER, (event) => {
        console.log(event);
      });

      // @ts-ignore
      channel.listen(EVENTS.GAME_START, (event: GameStartEvent) => {
        console.log('Game Start', event);
        setGameLoading(true);
        setDuration(event.duration / 1000);
        setOnComplete(() => startGame);
      });

      // @ts-ignore
      channel.listen(EVENTS.SONG_START, (event: Track) => {
        console.log('Song Start', event);
        setTrack(event.track);
        setOnComplete(() => playTrack);
        setDuration(event.pauseDuration);
        dispatch({ type: SET_PAUSE });
      });

      // @ts-ignore
      channel.listen(EVENTS.SONG_END, (event: Result) => {
        console.log('Song End : ', event);
        dispatch({ type: ADD_SONG_TO_HISTORY, payload: event });
      });

      // @ts-ignore
      channel.listen(EVENTS.GAME_END, (event) => {
        console.log('Game End : ', event);
      });
    }
  }, [channel]);

  const startGame = () => {
    setGameLoading(false);
    fetchNextTrack();
  };

  const fetchNextTrack = () => {
    fetchTrack(genreId);
  };

  const playTrack = () => {
    if (player) {
      player.play();
      setOnComplete(() => fetchNextTrack);
      setDuration(Math.trunc(player.duration));
      dispatch({ type: SET_PLAY });
    }
  };

  // useEffect(() => {
  //   if (player) {
  //     fetchNextTrack();
  //   }
  // }, [player]);

  useEffect(() => {
    if (player && track.trim().length > 0) {
      dispatch({ type: SET_TRACK, payload: track });
      player.src = track;
    }
  }, [player, track]);

  return (
    <>
      <audio
        controls
        ref={(ref) => setPlayer(ref)}
        preload="metadata"
        // className="hide"
        muted
      >
        <source src="https://cdns-preview-7.dzcdn.net/stream/c-78fed100d8c512d608dae53dee8eff1d-4.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Timer duration={duration} onComplete={() => { if (onComplete) onComplete(); }} />

      {
        gameLoading
          ? <div className="message-info">La partie commence dans un instant !</div>
          : null
      }
      {
        isWaiting
          ? <div className="message-info">Vous allez commencer à jouer dans un instant, préparez-vous !</div>
          : null
      }
    </>
  );
};

export default AudioPlayer;
