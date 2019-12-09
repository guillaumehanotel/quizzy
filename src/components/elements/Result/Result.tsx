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

  const getResultClassName = () => {
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

  const getTextClassName = (isArtist = true) => {
    switch (status) {
      case STATUS.FAIL:
        return 'text-pinkAccent';
      case STATUS.ARTIST:
        if (isArtist) return 'text-blue';
        break;
      case STATUS.TITLE:
        if (!isArtist) return 'text-orange';
        break;
      case STATUS.ALL:
        return 'text-green';
      default:
        return 'text-darkGrey';
    }
  };

  return (
    <>
      {
        isPlaying
          ? <SoundWaves />
          : <div className={`result ${getResultClassName()}`} data-tip data-for={`tooltip_${index}`} />
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
              <span className={getTextClassName()}>{artist}</span>
              <span> - </span>
              <span className={getTextClassName(false)}>{title}</span>
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
