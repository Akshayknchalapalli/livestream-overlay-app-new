// App.js
import React from 'react';
import './App.css';
import OverlayManager from './components/OverlayManager/OverlayManager';
import Player from './components/Player';
import Video from './components/Video';

function App() {
  const rtspUrl = 'rtmp://f6f4edf29d2f.entrypoint.cloud.wowza.com/app-M4vtDLC6'; // Replace with your RTSP URL

  // Example overlay data (you can fetch this from your backend)
  const overlays = [
    {
      content: 'Overlay 1',
      positionX: 10,
      positionY: 10,
      width: 20,
      height: 10,
    },
    {
      content: 'Overlay 2',
      positionX: 40,
      positionY: 30,
      width: 15,
      height: 15,
    },
  ];

  return (
    <div className="App">
      <h1>Livestream Overlay App</h1>
      <div className="App-container">
        <div className="App-left">
          <Player rtspUrl={rtspUrl} />
        </div>
        <div className="App-right">
          <OverlayManager />
        </div>
      </div>
      <div className="App-overlay">
        <Video rtspUrl={rtspUrl} overlays={overlays} />
      </div>
    </div>
  );
}

export default App;
