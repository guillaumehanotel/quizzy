import React from 'react';
import './SoundWaves.scss';

type Props = {
    enable: boolean;
};

const SoundWaves: React.FC<Props> = ({ enable }) => (
    <div className={`sound-waves ${enable ? 'animate' : ''}`}>
        {
            [...Array(10).keys()].map(() => (
                <div className="sound-bar"/>
            ))
        }
    </div>
);

export default SoundWaves;
