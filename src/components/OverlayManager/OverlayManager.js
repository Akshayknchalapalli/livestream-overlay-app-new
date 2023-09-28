import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import styles from './OverlayManager.module.css';
import 'bootstrap/dist/css/bootstrap.css';

function OverlayManager() {

  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    getOverlays();
  }, []);

  const getOverlays = async () => {
    try {
      const response = await axios.get('/api/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addOverlay = async (overlay) => {
    try {
      const response = await axios.post('/api/overlays', overlay);
      setOverlays([...overlays, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  const updateOverlay = async (updatedOverlay) => {
    try {
      await axios.put(`/api/overlays/${updatedOverlay.id}`, updatedOverlay);
      setOverlays(overlays.map(o => {
        if (o.id === updatedOverlay.id) {
          return updatedOverlay;
        }
        return o;
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const deleteOverlay = async (overlayId) => {
    try {
      await axios.delete(`/api/overlays/${overlayId}`);
      setOverlays(overlays.filter(o => o.id !== overlayId));
    } catch (error) {
      console.log(error);  
    }
  }

  return (
    <div>
      <h2>Manage Overlays</h2>

      <button onClick={() => addOverlay({id: 3, name: 'New Overlay'})}>
        Add Overlay
      </button>

      {overlays.map(overlay => (
        <div key={overlay.id}>
          {overlay.name}
          
          <button onClick={() => updateOverlay({...overlay, name: 'Updated Name'})}>
            Update
          </button>

          <button onClick={() => deleteOverlay(overlay.id)}>
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}
// Styling with CSS Modules

export default function OverlayManager() {

   const [overlays, setOverlays] = useState([
     {
       id: 1,
       text: 'Hello World',
       color: 'red'  
     },
     {
       id: 2, 
       text: 'My Overlay',
       color: 'blue'
     }
   ]);
 
   return (
     <div className={styles.container}>
       <h1>Overlay Manager</h1>
 
       <OverlaysList overlays={overlays} />
 
       <OverlayPreview overlay={overlays[0]} />
 
       <AddOverlay 
         onAdd={(text, color) => {
           setOverlays(prev => [...prev, {id: nextId, text, color}]);
         }}
       />
     </div>
   );
 }
 
 // Reusable OverlaysList component
 function OverlaysList({overlays}) {
   return (
     <ul>
       {overlays.map(overlay => (
         <li key={overlay.id}>{overlay.text}</li>  
       ))}
     </ul>
   );
 }
 
 // Show preview of selected overlay 
 function OverlayPreview({overlay}) {
   return (
     <div style={{color: overlay.color}}>
       {overlay.text}
     </div>
   );
 }
 
 // Form to add new overlays
 function AddOverlay({onAdd}) {
 
   const [text, setText] = useState('');
   const [color, setColor] = useState('red');
 
   const handleSubmit = e => {
     e.preventDefault();
     onAdd(text, color);
     setText('');
   }
 
   // ... form JSX
 
   return <form onSubmit={handleSubmit}>...</form>;
 }