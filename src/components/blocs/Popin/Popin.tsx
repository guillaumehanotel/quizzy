import React from 'react';
import './Popin.scss';

/**
 * HOC Component to handle popin blocks.
 */
const Popin: React.FC = ({ children }) => (
  <div className="popin scrollbar">
    { children }
  </div>
);

export default Popin;
