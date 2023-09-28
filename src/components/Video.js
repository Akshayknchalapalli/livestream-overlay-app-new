import React, { useRef } from 'react';

const Video = ({ src }) => {
  const videoRef = useRef(null);

  return (
    <video ref={videoRef} src={src} />  
  );
}

export default Video;  // Keep this export statement, remove the next one
