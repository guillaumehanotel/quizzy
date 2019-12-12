import React from 'react';
import Popin from '../Popin/Popin';
import { useGameState } from '../../../providers/GameProvider';
import './Podium.scss';
import { User } from '../../../models/User';

const getPosition = (index: number) => (index === 0 ? '1er' : `${index + 1}ème`);
const getScore = (user: User) => (user.score && user.score > 1 ? `${user.score}pts` : `${user.score}pt`);

/**
 * Display a popin with final results at the end of each game.
 */
const Podium = () => {
  const { finalResults } = useGameState();

  if (finalResults.length > 0) {
    return (
      <Popin>
        <div className="podium">
          <div className="center-align">
            <img src="/assets/podium.png" alt="Podium" />
          </div>
          <ul>
            {
              finalResults.map((user, i) => (
                <li key={`podium_${user.id}`}>
                  <strong>{`${getPosition(i)} : `}</strong>
                  <span>{user.name}</span>
                  <em>{` (${getScore(user)})`}</em>
                </li>
              ))
            }
          </ul>
        </div>
      </Popin>
    );
  }

  return null;
};

export default Podium;
