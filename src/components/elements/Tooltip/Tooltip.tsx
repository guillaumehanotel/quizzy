import React from 'react';
import './Tooltip.scss';

/**
 * HOC Component to create a tooltip element.
 * The container have to get the 'tooltip-container' class.
 */
const Tooltip: React.FC = ({ children }) => (
  <div className="tooltip">
    {children}
  </div>
);

export default Tooltip;
