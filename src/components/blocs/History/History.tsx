import React from 'react';
import SideBloc from '../SideBloc/SideBloc';
import { useGameState } from '../../../providers/GameProvider';

const History: React.FC = () => {
  const { gameHistory } = useGameState();

  return (
    <SideBloc title="Historique" left>
      <ul>
        {
          gameHistory.reverse().map((history, i) => (
            <li key={`history_${i}`}>
              <strong>{history.title}</strong>
              {` - ${history.artist}`}
            </li>
          ))
        }
      </ul>
    </SideBloc>
  );
};

export default History;
