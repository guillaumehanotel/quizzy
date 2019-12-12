import React, { useEffect, useState } from 'react';
import { useGameDispatch, useGameState } from '../../../providers/GameProvider';
import { User } from '../../../models/User';
import { useUserState } from '../../../providers/UserProvider';
import SideBloc from '../SideBloc/SideBloc';
import { EVENTS } from '../../../config/channelEvents';
import { AnswerCheck } from '../../../models/Game';
import { SET_FINAL_RESULTS } from '../../../config/actions/gameActions';

const getRankingLabel = (user: User, index: number) => {
  const position = index === 0 ? '1er' : `${index + 1}ème`;
  const userScore = user.score;
  const score = userScore && userScore > 1 ? `${userScore}pts` : `${userScore}pt`;

  return `${position} : ${user.name} (${score})`;
};

const Ranking: React.FC = () => {
  const [answer, setAnswer] = useState<AnswerCheck|null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(true);
  const { channel } = useGameState();
  const currentUser: User | null = useUserState().user;
  const dispatch = useGameDispatch();

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
      // @ts-ignore
      channel.listen(EVENTS.USER_RESPONSE, (event: AnswerCheck) => {
        setAnswer(event);
      });
      // @ts-ignore
      channel.listen(EVENTS.GAME_END, (event: { duration: number }) => {
        setIsGameEnd(true);
        setTimeout(() => {
          setIsGameEnd(false);
        }, event.duration);
      });
    }
  }, [channel]);

  useEffect(() => {
    if (answer) {
      const usersWithNewPoints = users.map((u) => {
        const user = u;
        if (user.id === answer.userId && user.score !== undefined) {
          user.score = answer.points;
        }

        return user;
      });

      setUsers(usersWithNewPoints);
    }
  }, [answer]);

  useEffect(() => {
    if (isGameEnd) {
      dispatch({ type: SET_FINAL_RESULTS, payload: users });
    } else {
      dispatch({ type: SET_FINAL_RESULTS, payload: [] });
    }
  }, [isGameEnd, users]);

  // @ts-ignore
  users.sort((a, b) => ((a.score < b.score) ? 1 : -1));

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
      </ul>
    </SideBloc>
  );
};

export default Ranking;
