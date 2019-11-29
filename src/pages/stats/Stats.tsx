import React from 'react';
import './Stats.scss';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

interface StatsMap { [key: string]: number | string; }

const Stats: React.FC = () => {
    const stats: StatsMap = {
        'Parties jouées': 14,
        'Parties remportées': 10,
        'Score moyen': 18,
        'Meilleur score': 22,
        'Catégorie préférée': 'Chanson française'
    };

    const data = [
        { month: "Janvier", year: "2019", average: 10 },
        { month: "Févrer", year: "2019", average: 12 },
        { month: "Mars", year: "2019", average: 15 },
        { month: "Avril", year: "2019", average: 14 },
        { month: "Mail", year: "2019", average: 11 },
        { month: "Juin", year: "2019", average: 17 },
        { month: "Juillet", year: "2019", average: 19 },
        { month: "Août", year: "2019", average: 18 }
    ];

    return (
        <div className={"stats-container z-depth-1"}>
            <h1 className={"center-align"}>Mes statistiques</h1>
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <ul>
                            {
                                Object.keys(stats).length > 0
                                    ? Object.keys(stats).map((key: string) => {
                                        return (
                                            <li key={key}>
                                                <span className={'stat-title w500'}>
                                                    {key} :
                                                </span>
                                                <span className={'stat-content ml-1 w500'}>
                                                    {stats[key]}
                                                </span>
                                            </li>
                                        );
                                    })
                                    : null
                            }
                        </ul>
                    </div>
                    <div className="col s7">
                        <span className={'average-score'}>Historique du score moyen</span>
                        <VictoryChart domainPadding={20}>
                            <VictoryAxis
                                tickValues={data.map((val) => val.month)}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`${x}`)}
                            />
                            <VictoryLine
                                data={data}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                x={"month"}
                                y={"average"}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onMouseOver: () => {
                                            console.log("toto")
                                            return [
                                                {
                                                    target: "labels",
                                                    mutation: () => ({ active: true })
                                                }
                                            ];
                                        },
                                        onMouseOut: () => {
                                            return [
                                                {
                                                    target: "labels",
                                                    mutation: () => ({ active: false })
                                                }
                                            ];
                                        }
                                    }
                                }]}
                                interpolation={"cardinal"}
                                labels={data.map((val) => val.average)}
                                //labelComponent={<VictoryTooltip cornerRadius={10}/>}
                            />
                        </VictoryChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;