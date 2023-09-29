import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

import './OverlayStyles.css';

function OverlayManager() {
  // Define Overlay State
  const [overlays, setOverlays] = useState([]);

  // Function to Add an Overlay
  function addOverlay(position, size, content) {
    // Create a new overlay object
    const newOverlay = {
      position,
      size,
      content,
    };

    // Update the overlays state with the new overlay
    setOverlays([...overlays, newOverlay]);
  }

   // Function to handle adding an overlay
   function handleAddOverlay() {
    // Implement logic to open a modal or form for user input
    // For example, using a state variable to manage modal visibility
    // After user input, call addOverlay with the provided data
    const newPosition = { x: 100, y: 50 }; // Example position
    const newSize = { width: 200, height: 100 }; // Example size
    const overlayContent = 'Your overlay content'; // Example content

    addOverlay(newPosition, newSize, overlayContent);
  }

  // Function to Position an Overlay
  function positionOverlay(index, newPosition) {
    // Make a copy of the overlays array
    const updatedOverlays = [...overlays];

    // Update the position of the overlay at the specified index
    updatedOverlays[index].position = newPosition;

    // Update the overlays state with the modified array
    setOverlays(updatedOverlays);
  }

  // Function to Resize an Overlay
  function resizeOverlay(index, newSize) {
    // Make a copy of the overlays array
    const updatedOverlays = [...overlays];

    // Update the size of the overlay at the specified index
    updatedOverlays[index].size = newSize;

    // Update the overlays state with the modified array
    setOverlays(updatedOverlays);
  }

  // Function to handle dragging an overlay
  function handleDragStop(index, data) {
    const newPosition = { x: data.x, y: data.y };
    positionOverlay(index, newPosition);
  }

  // Function to handle resizing an overlay
  function handleResize(index, size) {
    const newSize = { width: size.width, height: size.height };
    resizeOverlay(index, newSize);
  }

  return (
    <div className="overlay-manager">
      {/* Input fields for X and Y coordinates */}
      <label>X Coordinate:</label>
      <input
        type="number"
        value={xCoordinate}
        onChange={(e) => setXCoordinate(parseInt(e.target.value))}
      />
      <label>Y Coordinate:</label>
      <input
        type="number"
        value={yCoordinate}
        onChange={(e) => setYCoordinate(parseInt(e.target.value))}
      />

      {/* Create the "Add Overlay" button here */}
      <button onClick={handleAddOverlay}>Add Overlay</button>

      {/* Additional UI elements for positioning and resizing */}
      {overlays.map((overlay, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: overlay.position.x, y: overlay.position.y }}
          onStop={(e, data) => handleDragStop(index, data)}
        >
          <Resizable
            width={overlay.size.width}
            height={overlay.size.height}
            onResize={(e, { size }) => handleResize(index, size)}
          >
            <div className='custom-verlay'>
              {overlay.content}
            </div>
          </Resizable>
        </Draggable>
      ))}

      {overlays.map((overlay, index) => (
        <Draggable
          key={index}
          onDrag={(e, data) => handleOverlayDrag(index, data)}
        >
          <div
            style={{
              position: 'absolute',
              left: overlay.position.x,
              top: overlay.position.y,
              width: overlay.size.width,
              height: overlay.size.height,
            }}
          >
            {overlay.content}
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default OverlayManager;
