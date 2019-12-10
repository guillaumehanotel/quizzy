import React from 'react';
import './SideBloc.scss';

type Props = {
  title: string;
  left?: boolean;
  right?: boolean;
}

const SideBloc: React.FC<Props> = (props) => {
  const {
    title, children, left, right,
  } = props;

  return (
    <div className={`side-bloc-container ${left ? 'left' : ''} ${right ? 'right' : ''}`}>
      <div className="side-bloc">
        <h2>{ title }</h2>
        <span className="separator" />
        <div className="children scrollbar">
          { children }
        </div>
      </div>
    </div>
  );
};

export default SideBloc;
