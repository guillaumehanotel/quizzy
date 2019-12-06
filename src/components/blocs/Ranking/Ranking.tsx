import React, { useEffect, useState } from 'react';
import { useGameState } from '../../../providers/GameProvider';
import { User } from '../../../models/User';
import { useUserState } from '../../../providers/UserProvider';
import SideBloc from '../SideBloc/SideBloc';

const Ranking: React.FC = () => {
  const { channel } = useGameState();
  const currentUser: User | null = useUserState().user;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (channel) {
      channel.here((channelUsers: User[]) => {
        setUsers(channelUsers);
      });
      channel.joining((user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      });
      channel.leaving((user: User) => {
        setUsers((prevUsers) => (
          prevUsers.filter((prevUser) => prevUser.id !== user.id)
        ));
      });
    }
  }, [channel]);

  const getRankingLabel = (user: User, index: number) => {
    const position = index === 0 ? '1er' : `${index + 1}ème`;
    const userScore = user.score;
    const score = userScore && userScore > 1 ? `${userScore}pts` : `${userScore}pt`;

    return `${position} : ${user.name} (${score})`;
  };

  return (
    <SideBloc title="Classement" right>
      <ul>
        {
          users.map((user, index: number) => (
            <li key={user.id} className={currentUser && currentUser!.id === user.id ? 'w500' : ''}>
              {getRankingLabel(user, index)}
            </li>
          ))
        }
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
    </SideBloc>
  );
};

export default Ranking;
