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
}

const Result: React.FC<Props> = (props) => {
  const {
    status, artist, title, isPlaying,
  } = props;

  const getStyle = () => {

  };

  return (
    <>
      <div className="result" style={getStyle()} />
      <ReactTooltip />
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
