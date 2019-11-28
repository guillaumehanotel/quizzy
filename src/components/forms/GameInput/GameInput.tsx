import React, { useState } from 'react';
import './GameInput.scss';
import { FOUND } from '../../../pages/game/Game';

const getPlaceholder = (found: FOUND) => {
  switch (found) {
    case FOUND.ARTIST:
      return 'Titre';
    case FOUND.TITLE:
      return 'Artiste';
    case FOUND.ALL:
      return 'Bravo !';
    default:
      return 'Artiste et titre';
  }
};

const getBorderClass = (found: FOUND) => {
  switch (found) {
    case FOUND.FAIL:
      return 'border-red';
    case FOUND.ARTIST:
      return 'border-blue';
    case FOUND.TITLE:
      return 'border-orange';
    case FOUND.ALL:
      return 'border-green';
    default:
      return '';
  }
};

const GameInput = () => {
  const [value, setValue] = useState('');
  const [found, setFound] = useState(FOUND.NOTHING);

  const reset = () => {
    setValue('');
    setFound(FOUND.NOTHING);
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
        placeholder={getPlaceholder(found)}
        value={value}
        className={`browser-default ${getBorderClass(found)}`}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
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
