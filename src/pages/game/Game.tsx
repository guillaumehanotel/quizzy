import React from 'react';
import SoundWaves from "../../components/soundWaves/SoundWaves";
import {useParams} from "react-router";

const Game: React.FC = () => {
    // Room id
    let { id } = useParams();

    return (
        <div className="container row">
            <div className="col m3">
                history
            </div>

            <div className="col m6">
                <div>Dance</div>

                <div>
                    <SoundWaves enable={true} />
                </div>
            </div>

            <div className="col m3">
                classement
            </div>
        </div>
    )
};

export default Game;
