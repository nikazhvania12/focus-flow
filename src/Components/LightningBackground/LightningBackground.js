import React from 'react';
import './lightningBackground.css';

const LightningBackground = () => {
  return (
    <div className="lightning-bg">
      <div className="lightning-bolt"></div>
      <div className="lightning-bolt delay-1"></div>
      <div className="lightning-bolt delay-2"></div>
      <div className="lightning-bolt delay-3"></div>
    </div>
  );
};

export default LightningBackground;
