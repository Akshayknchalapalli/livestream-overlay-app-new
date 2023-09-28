import React, { useState } from 'react';
import Draggable from 'react-draggable'; 
import { Resizable } from 'react-resizable';

const Overlay = ({ src, initialPosition, initialSize }) => {

  // Manage position and size in local state
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);

  const handleResize = (e, { size }) => {
    // Update size state on resize
    setSize({
      width: size.width,
      height: size.height
    });
  };
  
  const handleDrag = (e, ui) => {
    // Update position state on drag
    setPosition({
      x: ui.x, 
      y: ui.y
    });
  };

  return (
    <Draggable 
      onDrag={handleDrag}
      position={position}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={handleResize}
      >
        <div
          style={{
            position: 'absolute', 
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            border: '1px solid #000' 
          }}
        >
          <video src={src} style={{ width: '100%', height: '100%' }} />
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Overlay;