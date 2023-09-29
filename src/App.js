import React from 'react';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import OverlayManager from './components/OverlayManager/OverlayManager'; 

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [overlays, setOverlays] = useState([]);
  const rtspUrl = 'http://localhost:5000/livestream/rtmp://7ef85eea2114.entrypoint.cloud.wowza.com/app-8Mr993br'; // Replace with your RTSP URL

  // Create a JSON object with the RTSP URL
  const data = { rtsp_url: rtspUrl };

  // Make a POST request to the Flask route
  fetch('/rtsp-url', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      // Handle the response from the backend, if needed
      console.log(data.message);
  })
  .catch(error => {
      // Handle any errors that occur during the POST request
      console.error('Error:', error);
  });

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
