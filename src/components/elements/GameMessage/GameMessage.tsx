import React from 'react';
import { useGameState } from '../../../providers/GameProvider';

const GameMessage = () => {
  const { message } = useGameState();

  return (
    <p className="center mt-5 mb-5">
      { message }
    </p>
  );
};

export default GameMessage;
