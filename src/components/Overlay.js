import React from 'react';

function Overlay({ position, size, content }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      {content}
    </div>
  );
}

export default Overlay;
