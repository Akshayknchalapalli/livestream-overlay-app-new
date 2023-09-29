// Player.js
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const Player = ({ rtspUrl }) => {
  // State to manage video playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume

  // Function to handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Function to handle volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <div>
      <div className="video-container">
        <ReactPlayer
          url={rtspUrl}
          playing={isPlaying}
          controls={true}
          volume={volume}
          width="100%"
          height="100%"
        />
      </div>
      <div className="controls">
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Player;
