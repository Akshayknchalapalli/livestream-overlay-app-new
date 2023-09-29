import React from 'react';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import Overlay from './Overlay'; // Import the Overlay component
import OverlayManager from './components/OverlayManager/OverlayManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Overlay from './Overlay';

function App() {
  const [overlays, setOverlays] = useState([]);
  const rtspUrl = 'http://localhost:5000/livestream/rtmp://f6f4edf29d2f.entrypoint.cloud.wowza.com/app-M4vtDLC6'; // Replace with your RTSP URL

  // Inside your component's render method
  return (
    <div className="container">
      <h1 className="app-title">Livestream App</h1>
      <div className="embed-responsive embed-responsive-16by9">
        <ReactPlayer
          url={rtspUrl}
          controls={true}
          className="embed-responsive-item video-player"
        />
      </div>

      {/* Render overlays using the Overlay component */}
      <div className="overlay-container">
        {overlays.map((overlay, index) => (
          <Overlay
            key={index}
            position={overlay.position}
            size={overlay.size}
            content={overlay.content}
          />
        ))}
      </div>

      {/* Include the OverlayManager component */}
      <OverlayManager />
    </div>
  );
}

export default App;
