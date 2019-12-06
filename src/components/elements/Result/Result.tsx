import React from 'react';
import ReactTooltip from 'react-tooltip';
import './Result.scss';
import '../../../styles/_variables.scss';
import { STATUS } from '../../../config/game';

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
      <div className={`result ${getClassName()}`} data-tip data-for={`tooltip_${index}`} />

      <ReactTooltip id={`tooltip_${index}`} type="light" place="bottom" effect="solid">
        <span>{artist || 'Toto'}</span>
        <span> - </span>
        <span>{title || 'L\'asticot'}</span>
      </ReactTooltip>
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
