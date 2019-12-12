import React from 'react';
import { useGameState } from '../../../providers/GameProvider';

/**
 * Display a simple message
 */
const GameMessage = () => {
  const { message } = useGameState();

  return (
    <p className="center mt-5 mb-5">
      { message }
    </p>
  );
};

export default GameMessage;
