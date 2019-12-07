import React, { useEffect, useState } from 'react';
import './GameInput.scss';
import { useGameDispatch, useGameState } from '../../../providers/GameProvider';
import { STATUS } from '../../../config/game';
import { SET_STATUS } from '../../../config/actions/gameActions';

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
  const [value, setValue] = useState('');
  const { isPlaying, status } = useGameState();
  const dispatch = useGameDispatch();

  const reset = () => {
    setValue('');
    dispatch({ type: SET_STATUS, payload: STATUS.NOTHING });
  };

  const sendValue = () => {
    if (value.trim().length > 0) {
      console.log(value);
    }
    setValue('');
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      sendValue();
    }
  };

  return (
    <div className="col s10 game-input-container">
      <input
        type="text"
        placeholder={getPlaceholder(status)}
        value={value}
        className={`browser-default ${getBorderClass(status)}`}
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
  );
};

export default GameInput;
