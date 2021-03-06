import React from 'react';
import SideBloc from '../SideBloc/SideBloc';
import { useGameState } from '../../../providers/GameProvider';
import './History.scss';

/**
 * Display game history with artiste and title of each song.
 * Refreshed at the end of each song.
 */
const History: React.FC = () => {
  const { gameHistory } = useGameState();

  return (
    <SideBloc title="Historique" left>
      <ul>
        {
          gameHistory.slice(0).reverse().map((result, i) => (
            <li key={`history_${i}`} className="history-item">
              <strong>{result.artist}</strong>
              {` - ${result.title}`}
            </li>
          ))
        }
      </ul>
    </SideBloc>
  );
};

export default History;
