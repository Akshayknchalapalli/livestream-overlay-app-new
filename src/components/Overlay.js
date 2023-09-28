import React, { useState } from 'react';
import Draggable from 'react-draggable'; 
import Resizable from 'react-resizable';

function Overlay({overlay}) {

  return (
    <Draggable>
      <Resizable width={overlay.width} height={overlay.height}>
        <div>{overlay.name}</div>
      </Resizable>
    </Draggable>
  )

}

function OverlayManager() {

  const [overlays, setOverlays] = useState([/* array of overlays */]);

  return (
    <div>
     {overlays.map(overlay => (
       <Overlay key={overlay.id} overlay={overlay} />  
     ))}
    </div>
  )

}