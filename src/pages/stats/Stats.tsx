import React, { useEffect, useState } from 'react';
import './Stats.scss';
import {
  VictoryLine, VictoryChart, VictoryAxis, VictoryZoomContainer,
} from 'victory';
import { fetchStats } from '../../utils/requests';
import { useUserState } from '../../providers/UserProvider';
import { Stat, Game, ChartGame } from '../../models/Stat';

const Stats: React.FC = () => {
  const state = useUserState();
  const [userStats, setStats] = useState<Stat | null>(null);
  const [graphData, setGraphDatas] = useState<ChartGame[] | null>(null);

  useEffect(() => {
    fetchUserStats();
  }, [state.user]);

  const fetchUserStats = async () => {
    if (state.user !== null && state.token !== null) {
      const stats: Stat | null = await fetchStats(state.user!.id, state.token!);
      if (stats !== null && typeof stats !== 'undefined') {
        const games: ChartGame[] = [];
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const chartDates: string[] = stats.games.map((game) => {
          const gameDate = new Date(game.created_at);
          return `${`${gameDate.getDay()}-${gameDate.getMonth()}-${gameDate.getFullYear()}`}`;
        });
        const uniquesChartDates: string[] = [...new Set(chartDates)];
        for (const date of uniquesChartDates) {
          const dateGames = stats.games.filter((game) => {
            const gameDate = new Date(game.created_at);
            return `${`${gameDate.getDay()}-${gameDate.getMonth()}-${gameDate.getFullYear()}`}` === date;
          });
          if (dateGames.length) {
            const totalDayPoints = dateGames.map((game) => game.points).reduce(reducer) / dateGames.length;
            const gameDate = new Date(dateGames[0].created_at);
            const chartGame: ChartGame = {
              points: totalDayPoints,
              date: `${gameDate.getDay()}/${gameDate.getMonth() + 1}/${gameDate.getFullYear()}`,
            };
            games.push(chartGame);
          }
        }
        console.log(games);
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
          <div className="col s5" style={{ overflow: 'scroll' }}>
            {
              userStats !== null && Object.keys(userStats).length > 0
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
                : null
            }
          </div>
          {graphData !== null
            ? (
              <div className="col s7" style={{ overflow: 'scroll' }}>
                <span className="average-score">Score moyen des parties par jour</span>
                <VictoryChart
                  domainPadding={20}
                  containerComponent={(
                    <VictoryZoomContainer
                      zoomDomain={{ x: [0, 4] }}
                      allowZoom={false}
                    />
                )}
                >
                  <VictoryAxis
                    tickValues={graphData.map((val) => val.date)}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                  />
                  <VictoryLine
                    data={graphData}
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    x="date"
                    y="points"
                    interpolation="cardinal"
                    labels={graphData.map((val) => val.points)}
                  />
                </VictoryChart>
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
};

export default Stats;
