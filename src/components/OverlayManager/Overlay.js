import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

function Overlay({ position, size, content, onUpdate }) {
  // State variables for position and size
  const [overlayPosition, setOverlayPosition] = useState(position);
  const [overlaySize, setOverlaySize] = useState(size);

  // Function to handle position change
  const handleDrag = (e, ui) => {
    const { x, y } = ui.deltaPosition;
    const newPosition = { x: overlayPosition.x + x, y: overlayPosition.y + y };
    setOverlayPosition(newPosition);
    onUpdate(newPosition, overlaySize);
  };

  // Function to handle size change
  const handleResize = (e, { size }) => {
    setOverlaySize(size);
    onUpdate(overlayPosition, size);
  };

  // Style the overlay based on position and size
  const overlayStyle = {
    position: 'absolute',
    left: overlayPosition.x,
    top: overlayPosition.y,
    width: overlaySize.width,
    height: overlaySize.height,
    border: '1px solid #ccc',
    // Add any other styles you want here
  };

  return (
    <Draggable onDrag={handleDrag}>
      <Resizable
        width={overlaySize.width}
        height={overlaySize.height}
        onResize={handleResize}
      >
        <div style={overlayStyle}>
          {/* Render overlay content */}
          {content}
        </div>
      </Resizable>
    </Draggable>
  );
}

export default Overlay;
