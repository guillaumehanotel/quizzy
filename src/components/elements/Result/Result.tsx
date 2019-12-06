import React from 'react';
import ReactTooltip from 'react-tooltip';
import './Result.scss';
import '../../../styles/_variables.scss';
import { STATUS } from '../../../config/game';
import SoundWaves from '../SoundWaves/SoundWaves';

type Props = {
  status?: STATUS;
  artist?: string | null;
  title?: string | null;
  isPlaying?: boolean;
  index: number;
}

const Result: React.FC<Props> = (props) => {
  const {
    status, artist, title, isPlaying, index,
  } = props;

  const getClassName = () => {
    switch (status) {
      case STATUS.FAIL:
        return 'bg-pinkAccent';
      case STATUS.ARTIST:
        return 'bg-blue';
      case STATUS.TITLE:
        return 'bg-orange';
      case STATUS.ALL:
        return 'bg-green';
      default:
        return 'bg-grey';
    }
  };

  return (
    <>
      {
        isPlaying
          ? <SoundWaves />
          : <div className={`result ${getClassName()}`} data-tip data-for={`tooltip_${index}`} />
      }

      {
        artist && title
          ? (
            <ReactTooltip
              id={`tooltip_${index}`}
              className="tooltip"
              type="light"
              place="bottom"
              effect="solid"
            >
              <span>{artist || 'Toto'}</span>
              <span> - </span>
              <span>{title || 'L\'asticot'}</span>
            </ReactTooltip>
          )
          : null
      }
    </>
  );
};

Result.defaultProps = {
  status: STATUS.NOTHING,
  artist: null,
  title: null,
  isPlaying: false,
};

export default Result;
