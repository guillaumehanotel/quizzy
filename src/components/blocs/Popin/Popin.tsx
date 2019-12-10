import React from 'react';
import './Popin.scss';

const Popin: React.FC = ({ children }) => (
  <div className="popin scrollbar">
    { children }
  </div>
);

export default Popin;
