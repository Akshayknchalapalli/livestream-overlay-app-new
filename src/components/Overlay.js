// Overlay.js
import React from 'react';

const Overlay = ({ overlay }) => {
  const { content, positionX, positionY, width, height } = overlay;

  const overlayStyle = {
    position: 'absolute',
    left: `${positionX}%`,
    top: `${positionY}%`,
    width: `${width}%`,
    height: `${height}%`,
    background: 'rgba(255, 255, 255, 0.7)', // Adjust the background color and opacity
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={overlayStyle}>
      <span>{content}</span>
    </div>
  );
};

export default Overlay;
