import React, { useState } from 'react';
import Video from './Video';
import Overlay from './Overlay';

const OverlayManager = () => {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    src: '', 
    position: 'absolute',
    size: { width: '100px', height: '100px' },  
  });

  const addOverlay = () => {
    setOverlays([...overlays, {...newOverlay, id: Date.now()}]);
    setNewOverlay({
      src: '',
      position: 'absolute',
      size: { width: '100px', height: '100px' },  
    });
  };

  const removeOverlay = (id) => {
    setOverlays(overlays.filter(overlay => overlay.id !== id));
  };

  return (
    <>
      <Video src="/livestream.mp4" />
      
      {overlays.map(overlay => (
        <Overlay 
          key={overlay.id}
          {...overlay}
          onDelete={() => removeOverlay(overlay.id)}
        />
      ))}

      <form onSubmit={addOverlay}>
        <input 
          value={newOverlay.src}
          onChange={e => setNewOverlay({...newOverlay, src: e.target.value})} 
        />
        <button type="submit">Add Overlay</button>
      </form>
    </>
  );
}

export default OverlayManager;