import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import OverlayManager from './components/OverlayManager';
import { getOverlays, addOverlay, updateOverlay, deleteOverlay } from './api';

function App() {

  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    getOverlays()
      .then(res => setOverlays(res.data)) 
      .catch(err => console.log(err));
  }, []);

  const handleAdd = (overlay) => {
    addOverlay(overlay)
      .then(newOverlay => {
        setOverlays(prev => [...prev, newOverlay]);
      })
  };

  const handleUpdate = (updatedOverlay) => {
    updateOverlay(updatedOverlay)
      .then(res => {
        setOverlays(prev => prev.map(o => {
          if (o._id === updatedOverlay._id) {
            return updatedOverlay;
          }
          return o;
        }))
      })
      .catch(err => console.log(err));
  }
  
  const handleDelete = (overlayId) => {
    deleteOverlay(overlayId)
      .then(() => {
        setOverlays(prev => prev.filter(o => o._id !== overlayId));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <ReactPlayer url="/path/to/video.mp4" />

      <OverlayManager
        overlays={overlays}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}  
      />
    </div>
  );

}

export default App;