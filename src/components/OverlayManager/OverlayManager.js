import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

import './OverlayManager.css';
import Overlay from './Overlay';
import Modal from 'react-modal';

function OverlayManager() {
  // Define Overlay State
  const [overlays, setOverlays] = useState([]);
  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [overlayContent, setOverlayContent] = useState('');
  const [indexToRemove, setIndexToRemove] = useState(null);
  const [isAddingOverlay, setIsAddingOverlay] = useState(false);
  const [newOverlayContent, setNewOverlayContent] = useState('');


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
    setIsAddingOverlay(false); // Close the modal/form after adding the overlay
    setNewOverlayContent(''); // Clear the input field
  }

  // Function to Open the Overlay Addition Modal/Form
  function openOverlayModal() {
    setIsAddingOverlay(true);
  }

  // Function to Close the Overlay Addition Modal/Form
  function closeOverlayModal() {
    setIsAddingOverlay(false);
    setNewOverlayContent(''); // Clear the input field
  }

  // Function to Remove an Overlay
  function removeOverlay() {
    if (indexToRemove !== null) {
      const updatedOverlays = overlays.slice(); // Make a copy of the overlays array
      updatedOverlays.splice(indexToRemove, 1); // Remove the overlay at the specified index
      setOverlays(updatedOverlays); // Update the overlays state with the modified array
      setIndexToRemove(null); // Reset the indexToRemove state
    }
  }

   // Function to handle adding an overlay
    function handleAddOverlay() {
      // Collect user input for overlay properties (position, size, content)
      const newPosition = { x: xCoordinate, y: yCoordinate };
      const newSize = { width: 200, height: 100 }; // Example size
      const newOverlayContent = overlayContent;

      // Call the addOverlay function with the provided data
      addOverlay(newPosition, newSize, newOverlayContent);

      // Clear input fields or reset state variables as needed
      setXCoordinate(0);
      setYCoordinate(0);
      setOverlayContent('');
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
  function handleOverlayDrag(index, data) {
    // Calculate the new position based on the drag data
    const newPosition = {
      x: data.x,
      y: data.y,
    };

    // Use the positionOverlay function to update the overlay's position
    positionOverlay(index, newPosition);
  }

  // Function to handle resizing an overlay
  function handleOverlayResize(index, size) {
    // Calculate the new size based on the resize data
    const newSize = {
      width: size.width,
      height: size.height,
    };

    // Use the resizeOverlay function to update the overlay's size
    resizeOverlay(index, newSize);
  }

  return (
    <div className="overlay-manager">
      {/* Input fields for X and Y coordinates */}
      <label className="input-label">X Coordinate:</label>
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

      {/* Input field for overlay content */}
      <label className="input-label">Overlay Content:</label>
      <input
        type="text"
        value={overlayContent}
        onChange={(e) => setOverlayContent(e.target.value)}
      />

      {/* Create the "Add Overlay" button and draggable/resizable overlays here */}
      <button className="add-overlay-button" onClick={handleAddOverlay}>Add Overlay</button>

      {/* Additional UI elements for positioning and resizing */}
      {overlays.map((overlay, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: overlay.position.x, y: overlay.position.y }}
          onStop={(e, data) => handleOverlayDrag(index, data)}
        >
          <Resizable
            width={overlay.size.width}
            height={overlay.size.height}
            onResize={(e, { size }) => handleOverlayResize(index, size)}
          >
            <div className='custom-verlay'>
              {overlay.content}
            </div>
          </Resizable>
        </Draggable>
      ))}

      {overlays.map((overlay, index) => (
        <Resizable
          key={index}
          width={overlay.size.width}
          height={overlay.size.height}
          onResize={(e, { size }) => handleOverlayResize(index, size)}
        >
          <Draggable
            onDrag={(e, data) => handleOverlayDrag(index, data)}
          >
            <div
              style={{
                position: 'absolute',
                left: overlay.position.x,
                top: overlay.position.y,
              }}
            >
              {overlay.content}
            </div>
          </Draggable>
        </Resizable>
      ))}

      {/* Render individual overlays */}
      {overlays.map((overlay, index) => (
        <Overlay
          key={index}
          position={overlay.position}
          size={overlay.size}
          content={overlay.content}
        />
      ))}

      {/* UI elements for overlay management */}
      <div className="overlay-controls">
      <button onClick={openOverlayModal}>Add Overlay</button>
      <button onClick={removeOverlay}>Remove Overlay</button>
        {/* Add more controls as needed */}
      </div>

      {/* Modal/Form for Adding Overlays */}
      <Modal
        isOpen={isAddingOverlay}
        onRequestClose={closeOverlayModal}
        contentLabel="Add Overlay Modal"
      >
        <h2>Add New Overlay</h2>
        <textarea
          value={newOverlayContent}
          onChange={(e) => setNewOverlayContent(e.target.value)}
          placeholder="Enter overlay content here..."
        />
        <button onClick={() => addOverlay(newOverlayContent)}>Add</button>
        <button onClick={closeOverlayModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default OverlayManager;
