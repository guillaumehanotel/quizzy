import React from 'react';
import { useParams } from 'react-router-dom';
import SoundWaves from '../../components/soundWaves/SoundWaves';

const Game: React.FC = () => {
  // Room id
  let {id} = useParams();

  return (
    <div className="container row">
      <div className="col m3">
        history
      </div>

      <div className="col m6">
        <div>Dance</div>

        <div>
          <SoundWaves enable={true}/>
        </div>
      </div>

      <div className="col m3">
        classement
      </div>
    </div>
  )
};

export default Game;
