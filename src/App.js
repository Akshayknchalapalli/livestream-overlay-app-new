import React from 'react';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import OverlayManager from './components/OverlayManager/OverlayManager'; 

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      {/* Include the OverlayManager component */}
      <OverlayManager />
    </div>
    
  );
  
}

export default App;
