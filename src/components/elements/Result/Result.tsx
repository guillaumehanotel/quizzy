import React from 'react';
import './Result.scss';
import '../../../styles/_variables.scss';
import { STATUS } from '../../../config/game';
import SoundWaves from '../SoundWaves/SoundWaves';
import Tooltip from '../Tooltip/Tooltip';

type Props = {
  status?: STATUS;
  artist?: string | null;
  title?: string | null;
  isPlaying?: boolean;
  index: number;
}

/**
 * Each result represents a song of the game.
 * The result have a different behavior depending on the status and the response.
 */
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
          : (
            <div className={`result tooltip-container ${getResultClassName()}`} data-tip data-for={`tooltip_${index}`}>
              {
                artist && title
                  ? (
                    <Tooltip>
                      <div className={getTextClassName()}>{artist}</div>
                      <span> - </span>
                      <div className={getTextClassName(false)}>{title}</div>
                    </Tooltip>
                  )
                  : null
              }
            </div>
          )
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
