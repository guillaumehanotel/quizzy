import React, { useEffect, useState } from 'react';
import 'react-input-range/lib/css/index.css';
import './AudioPlayer.scss';
import Timer from '../Timer/Timer';
import { useGameDispatch, useGameState } from '../../../providers/GameProvider';
import {
  ADD_SONG_TO_HISTORY, SET_MESSAGE, SET_ORDER, SET_PAUSE, SET_PLAY, SET_TRACK,
} from '../../../config/actions/gameActions';
import { EVENTS } from '../../../config/channelEvents';
import { fetchTrack } from '../../../utils/requests';
import { User } from '../../../models/User';
import { Result, Track } from '../../../models/Game';

type GameStartEvent = {
  duration: number;
}

const AudioPlayer: React.FC = () => {
  const { channel, genreId } = useGameState();
  const [track, setTrack] = useState<string>('');
  const [player, setPlayer] = useState<HTMLAudioElement|null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [onComplete, setOnComplete] = useState<Function|null>(null);
  const dispatch = useGameDispatch();

  // TODO: REMOVE IT - For dev (Hot reloading doesn't recreate a new game).
  // useEffect(() => {
  //   if (genreId) {
  //     fetchNextTrack();
  //   }
  // }, [genreId]);

  /**
   * Websocket events.
   */
  useEffect(() => {
    if (channel) {
      channel.here((channelUsers: User[]) => {
        dispatch({ type: SET_MESSAGE, payload: 'Vous allez commencer à jouer dans un instant, préparez-vous !' });
        setOnComplete(() => fetchNextTrack);
        // TODO: Set to 40
        setDuration(7);
      });

      // @ts-ignore
      channel.listenForWhisper(EVENTS.CURRENT_TIMER, (event) => {
        console.log(event);
      });

      // @ts-ignore
      channel.listen(EVENTS.GAME_START, (event: GameStartEvent) => {
        console.log('Game Start', event);
        dispatch({ type: SET_MESSAGE, payload: 'La partie commence dans un instant !' });
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
        dispatch({ type: SET_TRACK, payload: event.track });
        dispatch({ type: SET_ORDER, payload: event.order });
      });

      // @ts-ignore
      channel.listen(EVENTS.SONG_END, (event: Result) => {
        console.log('Song End : ', event);
        dispatch({ type: ADD_SONG_TO_HISTORY, payload: event });
      });

      // @ts-ignore
      channel.listen(EVENTS.GAME_END, (event: { duration: number }) => {
        setOnComplete(() => playTrack);
        setDuration(event.duration);
        console.log('Game End : ', event);
      });
    }
  }, [channel]);

  useEffect(() => {
    if (player && track.trim().length > 0) {
      player.src = track;
    }
  }, [player, track]);

  const startGame = () => {
    fetchNextTrack();
  };

  const fetchNextTrack = () => {
    dispatch({ type: SET_MESSAGE, payload: '' });
    fetchTrack(genreId);
  };

  const playTrack = () => {
    if (player) {
      try {
        player.play();
      } catch (e) {
        console.error(`Une erreur est survenue pendant la lecture de l'extrait : ${e}`);
        dispatch({ type: SET_MESSAGE, payload: 'Une erreur est survenue pendant la lecture de l\'extrait' });
        fetchNextTrack();
      }
      setOnComplete(() => fetchNextTrack);
      setDuration(Math.trunc(player.duration));
      dispatch({ type: SET_PLAY });
    }
  };

  return (
    <>
      <audio
        controls
        ref={(ref) => setPlayer(ref)}
        preload="metadata"
        className="hide"
        // muted
      >
        <source src="https://cdns-preview-7.dzcdn.net/stream/c-78fed100d8c512d608dae53dee8eff1d-4.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Timer duration={duration} onComplete={() => { if (onComplete) onComplete(); }} />
    </>
  );
};

export default AudioPlayer;
