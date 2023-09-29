import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

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
    <Draggable>
      <Resizable width={size.width} height={size.height}>
        <div style={overlayStyle}>
          {/* Render overlay content */}
          {content}
        </div>
      </Resizable>
    </Draggable>
  );
}

export default Overlay;
