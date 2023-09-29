import React from 'react';

function Overlay({ position, size, content }) {
  // Style the overlay based on position and size
  const overlayStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    border: '1px solid #ccc',
    // Add any other styles you want here
  };

  return (
    <div style={overlayStyle}>
      {/* Render overlay content */}
      {content}
    </div>
  );
}

export default Overlay;
