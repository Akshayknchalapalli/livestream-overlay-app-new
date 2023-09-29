// OverlayManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverlayManager = () => {
  // State to hold overlay settings and manage updates
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    content: '',
    positionX: 0,
    positionY: 0,
    width: 100,
    height: 100,
  });

  // Fetch overlay settings from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/overlays')
      .then((response) => {
        setOverlays(response.data.overlays);
      })
      .catch((error) => {
        console.error('Error fetching overlays:', error);
      });
  }, []);

  // Function to add a new overlay
  const addOverlay = () => {
    // Send a POST request to the backend to create a new overlay
    axios.post('/api/overlays', newOverlay)
      .then((response) => {
        // Update the local state with the new overlay
        setOverlays([...overlays, response.data.overlay]);
        // Clear the input fields
        setNewOverlay({
          content: '',
          positionX: 0,
          positionY: 0,
          width: 100,
          height: 100,
        });
      })
      .catch((error) => {
        console.error('Error adding overlay:', error);
      });
  };

  // Function to delete an overlay
  const deleteOverlay = (overlayId) => {
    // Send a DELETE request to the backend to delete the overlay
    axios.delete(`/api/overlays/${overlayId}`)
      .then(() => {
        // Update the local state to remove the deleted overlay
        setOverlays(overlays.filter((overlay) => overlay._id !== overlayId));
      })
      .catch((error) => {
        console.error('Error deleting overlay:', error);
      });
  };

  // Render the list of overlays and the form to add new overlays
  return (
    <div>
      <h2>Overlay Manager</h2>
      <div>
        <h3>Add Overlay</h3>
        <input
          type="text"
          placeholder="Content"
          value={newOverlay.content}
          onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
        />
        <input
          type="number"
          placeholder="X Position"
          value={newOverlay.positionX}
          onChange={(e) => setNewOverlay({ ...newOverlay, positionX: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Y Position"
          value={newOverlay.positionY}
          onChange={(e) => setNewOverlay({ ...newOverlay, positionY: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Width"
          value={newOverlay.width}
          onChange={(e) => setNewOverlay({ ...newOverlay, width: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Height"
          value={newOverlay.height}
          onChange={(e) => setNewOverlay({ ...newOverlay, height: parseInt(e.target.value) })}
        />
        <button onClick={addOverlay}>Add Overlay</button>
      </div>
      <div>
        <h3>Overlays</h3>
        <ul>
          {overlays.map((overlay) => (
            <li key={overlay._id}>
              {overlay.content} - Position: {overlay.positionX}, {overlay.positionY}
              <button onClick={() => deleteOverlay(overlay._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverlayManager;
