import React, { useState } from 'react';
import Video from './Video';
import Overlay from './Overlay';

const OverlayManager = () => {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    src: '', 
    position: 'absolute',
    size: { width: '100px', height: '100px' }
  });

  const addOverlay = () => {
    setOverlays([...overlays, {...newOverlay, id: Date.now()}]);
    setNewOverlay({
      src: '',
      position: 'absolute',
      size: { width: '100px', height: '100px' }
    });
  };

  const removeOverlay = (id) => {
    setOverlays(overlays.filter(overlay => overlay.id !== id));
  };

  const updateOverlay = (id, updatedOverlay) => {
    const updatedOverlays = overlays.map(overlay => {
      if (overlay.id === id) {
        return updatedOverlay;  
      }
      return overlay;
    });
    setOverlays(updatedOverlays);
  };

  return (
    <>
      <Video src="/livestream.mp4" />
      
      <div>
        <h2>Overlay Management</h2>
        
        {/* Overlay Form */}
        <h3>Add Overlay</h3>
        <form onSubmit={addOverlay}>
          {/* Form fields to update newOverlay state */}
          <button type="submit">Add</button> 
        </form>
        
        {/* Display Existing Overlays */}
        <h3>Existing Overlays</h3>
        
        <ul>
          {overlays.map(overlay => (
            <li key={overlay.id}>
              <Overlay {...overlay} />
              
              <button onClick={() => removeOverlay(overlay.id)}>
                Remove
              </button>
              
              <button 
                onClick={() => updateOverlay(overlay.id, {
                  ...overlay,  
                  size: { width: '200px', height: '200px' } 
                })}>
                Update Size
              </button>
            </li>
          ))}
        </ul>
        
      </div>
    </>
  );
}

export default OverlayManager;