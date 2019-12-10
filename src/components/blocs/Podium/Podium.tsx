import React from 'react';
import Popin from '../Popin/Popin';
import { useGameState } from '../../../providers/GameProvider';

const Podium = () => {
  const { finalResults } = useGameState();

  if (finalResults.length > 0) {
    return (
      <Popin>
        Podium
      </Popin>
    );
  }

  return null;
};

export default Podium;
