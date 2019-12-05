import React, { useEffect, useState } from 'react';
import { useGameState } from '../../../providers/GameProvider';
import { ChannelUser, User } from '../../../models/User';
import { useUserState } from '../../../providers/UserProvider';
import SideBloc from '../SideBloc/SideBloc';

const Ranking: React.FC = () => {
  const { channel } = useGameState();
  const currentUser: User | null = useUserState().user;
  const [users, setUsers] = useState<ChannelUser[]>([]);

  useEffect(() => {
    if (channel) {
      channel.here((channelUsers: ChannelUser[]) => {
        setUsers(channelUsers);
      });
      channel.joining((user: ChannelUser) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      });
      channel.leaving((user: ChannelUser) => {
        setUsers((prevUsers) => (
          prevUsers.filter((prevUser) => prevUser.user.id !== user.user.id)
        ));
      });
    }
  }, [channel]);

  const getRankingLabel = (user: ChannelUser, index: number) => {
    const position = index === 0 ? '1er' : `${index + 1}ème`;
    const userScore = user.user.score;
    const score = userScore && userScore > 1 ? `${userScore}pts` : `${userScore}pt`;

    return `${position} : ${user.user.name} (${score})`;
  };

  return (
    <SideBloc title="Classement" right>
      <ul>
        {
          users.map((user, index: number) => (
            <li key={user.user.id} className={currentUser && currentUser!.id === user.user.id ? 'w500' : ''}>
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
