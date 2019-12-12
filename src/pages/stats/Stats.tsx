import React, { useEffect, useState } from 'react';
import './Stats.scss';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { fetchStats } from '../../utils/requests';
import { useUserState } from '../../providers/UserProvider';
import { Stat, ChartGame } from '../../models/Stat';

/**
 * Statistique page.
 */
const Stats: React.FC = () => {
  const state = useUserState();
  const [userStats, setStats] = useState<Stat | null>(null);
  const [graphData, setGraphDatas] = useState<ChartGame[] | null>(null);

  useEffect(() => {
    fetchUserStats();
  }, [state.user]);

  const fetchUserStats = async () => {
    if (state.user !== null && state.token !== null) {
      // Once we're authenticated, we're fetching the user stats
      const stats: Stat | null = await fetchStats(state.user!.id, state.token!);
      if (stats !== null && typeof stats !== 'undefined') {
        const games: ChartGame[] = [];
        // The reducer below is used to add two values from two different objects (game points) while being in a loop
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const chartDates: string[] = stats.games.map((game) => {
          const gameDate = new Date(game.created_at);
          return `${`${gameDate.getDate()}-${gameDate.getMonth()}-${gameDate.getFullYear()}`}`;
        });
        console.log(chartDates)
        // Set() creates a unique array
        const uniquesChartDates: string[] = [...new Set(chartDates)];
        for (const date of uniquesChartDates) {
          // Filtering games depending on their date
          const dateGames = stats.games.filter((game) => {
            const gameDate = new Date(game.created_at);
            return `${`${gameDate.getDate()}-${gameDate.getMonth()}-${gameDate.getFullYear()}`}` === date;
          });
          if (dateGames.length) {
            // Uses the reducer to add every game points to get the rounded average amount a point by day
            const totalDayPoints = Math.round(dateGames.map((game) => game.points).reduce(reducer) / dateGames.length);
            const gameDate = new Date(dateGames[0].created_at);
            const chartGame: ChartGame = {
              points: totalDayPoints,
              date: `${gameDate.getDate()}/${gameDate.getMonth() + 1}/${gameDate.getFullYear()}`,
            };
            games.push(chartGame);
          }
        }
        // We're sorting the games by date in case we don't receive them in the good order
        games.sort((a: ChartGame, b: ChartGame) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setGraphDatas(games);
      }
      setStats(stats);
    }
  };

  return (
    <div className="stats-container z-depth-1">
      <h1 className="center-align">Mes statistiques</h1>
      <div className="container">
        <div className="row">
          <div className="col m5 s12" style={{ overflow: 'auto' }}>
            {
              userStats !== null && Object.keys(userStats).length > 0 && userStats.games.length
                ? (
                  <ul>
                    <li>
                      <span className="stat-title w500">Score moyen : </span>
                      <span className="stat-content ml-1 w500">
                        {userStats.averageScore}
                      </span>
                    </li>
                    <li>
                      <span className="stat-title w500">Meilleur score : </span>
                      <span className="stat-content ml-1 w500">
                        {userStats.bestScore}
                      </span>
                    </li>
                    <li>
                      <span className="stat-title w500">Catégorie la plus jouée : </span>
                      <span className="stat-content ml-1 w500">
                        {userStats.favoriteCategory.name}
                      </span>
                    </li>
                    <li>
                      <span className="stat-title w500">Parties gagnées : </span>
                      <span className="stat-content ml-1 w500">
                        {userStats.winGames}
                      </span>
                    </li>
                    <li>
                      <span className="stat-title w500">Nombre total de parties : </span>
                      <span className="stat-content ml-1 w500">
                        {userStats.totalGames}
                      </span>
                    </li>
                  </ul>
                )
                : <span>Vous n'avez pas encore joué de partie.</span>
            }
          </div>
          {graphData !== null
            ? (
              <div className="col s12 m7" style={{ overflow: 'auto' }}>
                <span className="average-score">Score moyen des parties par jour</span>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    width={500}
                    height={300}
                    data={graphData}
                    margin={{
                      top: 10, right: 10, left: 0, bottom: 10,
                    }}

                  >
                    <XAxis dataKey="date" tickSize={15} tickLine={false}/>
                    <YAxis domain={[0, 20]}/>
                    <Tooltip />
                    <Line type="monotone" dataKey="points" stroke="#FF9AA1" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
};

export default Stats;
