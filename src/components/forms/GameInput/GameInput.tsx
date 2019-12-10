import React, { useEffect, useState } from 'react';
import './GameInput.scss';
import { useGameDispatch, useGameState } from '../../../providers/GameProvider';
import { STATUS } from '../../../config/game';
import { SET_STATUS } from '../../../config/actions/gameActions';
import { useUserState } from '../../../providers/UserProvider';
import { sendAnswer } from '../../../utils/requests';
import { EVENTS } from '../../../config/channelEvents';
import { AnswerCheck } from '../../../models/Game';

const getPlaceholder = (status: STATUS) => {
  switch (status) {
    case STATUS.ARTIST:
      return 'Titre';
    case STATUS.TITLE:
      return 'Artiste';
    case STATUS.ALL:
      return 'Bravo !';
    default:
      return 'Artiste et titre';
  }
};

const getBorderClass = (status: STATUS) => {
  switch (status) {
    case STATUS.FAIL:
      return 'border-red';
    case STATUS.ARTIST:
      return 'border-blue';
    case STATUS.TITLE:
      return 'border-orange';
    case STATUS.ALL:
      return 'border-green';
    default:
      return '';
  }
};

const GameInput: React.FC = () => {
  const [input, setInput] = useState<HTMLInputElement|null>(null);
  const [value, setValue] = useState('');
  const [artist, setArtist] = useState<boolean>(false);
  const [title, setTitle] = useState<boolean>(false);
  const [answerCheck, setAnswerCheck] = useState<AnswerCheck|null>(null);
  const [shake, setShake] = useState<boolean>(false);
  const { user } = useUserState();
  const {
    channel, isPlaying, status, genreId, order,
  } = useGameState();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (channel) {
      // @ts-ignore
      channel.listen(EVENTS.USER_RESPONSE, (event: AnswerCheck) => {
        console.log('User response : ', event);
        if (event.userId === user!.id) {
          setAnswerCheck(event);
        }
      });
      // @ts-ignore
      channel.listen(EVENTS.SONG_START, () => {
        reset();
      });
    }
  }, [channel]);

  useEffect(() => {
    if (answerCheck) {
      if (answerCheck.artist) setArtist(true);
      if (answerCheck.title) setTitle(true);

      if (!answerCheck.artist && !answerCheck.title) {
        setShake(true);

        if (status === STATUS.NOTHING) {
          dispatch({ type: SET_STATUS, payload: STATUS.FAIL });
        }
      }
    }
  }, [answerCheck]);

  useEffect(() => {
    if (artist && title) {
      dispatch({ type: SET_STATUS, payload: STATUS.ALL });
    } else if (artist && !title) {
      dispatch({ type: SET_STATUS, payload: STATUS.ARTIST });
    } else if (!artist && title) {
      dispatch({ type: SET_STATUS, payload: STATUS.TITLE });
    } else {
      dispatch({ type: SET_STATUS, payload: STATUS.NOTHING });
    }
  }, [artist, title]);

  useEffect(() => {
    if (isPlaying && input) {
      input.focus();
    }
  }, [isPlaying]);

  const reset = () => {
    setValue('');
    setArtist(false);
    setTitle(false);
    dispatch({ type: SET_STATUS, payload: STATUS.NOTHING });
  };

  const sendValue = () => {
    if (value.trim().length > 0 && user !== null && (!artist || !title)) {
      setShake(false);
      sendAnswer(genreId, user.id, { order, input: value });
    }
    setValue('');
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      sendValue();
    }
  };

  return (
    <>
      <div className="col s9 game-input-container">
        <input
          ref={(ref) => setInput(ref)}
          type="text"
          placeholder={getPlaceholder(status)}
          value={value}
          className={`browser-default ${getBorderClass(status)} ${shake ? 'shake' : ''}`}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!isPlaying}
        />

        <button
          type="submit"
          className="btn"
          onClick={() => sendValue()}
        >
          OK
        </button>
      </div>

      <div className="icons-indicator">
        <img src={`/assets/microphone${artist ? '-active' : ''}.png`} alt="icon-microphone" />
        <img src={`/assets/note${title ? '-active' : ''}.png`} alt="icon-note" />
      </div>
    </>
  );
};

export default GameInput;
