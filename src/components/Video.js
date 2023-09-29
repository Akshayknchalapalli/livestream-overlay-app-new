// Video.js
import React, { useRef } from 'react';
import { FFmpeg } from 'react-ffmpeg';

const Video = ({ rtspUrl, overlays }) => {
  const videoRef = useRef(null);

  // Set up FFmpeg filters to overlay text or logos on the video
  const overlayFilters = overlays.map((overlay, index) => {
    const { content, positionX, positionY, width, height } = overlay;
    return `overlay=${positionX}:${positionY}:enable='between(t,0,10)'`;
  });

  // Construct the FFmpeg filter string
  const filterString = overlayFilters.join(',');

  return (
    <div>
      <FFmpeg
        url={rtspUrl}
        ffmpegWASMPath="/path/to/ffmpeg.wasm"
        onSeek={(time) => {
          // Handle video seeking if needed
        }}
        onProgress={(progress) => {
          // Handle video progress if needed
        }}
      >
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          controls
          playsInline
          autoPlay
        />
        <canvas
          id="overlayCanvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </FFmpeg>
    </div>
  );
};

export default Video;
