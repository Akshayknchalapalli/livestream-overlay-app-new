import React from 'react';

const Overlay = ({ src, position, size }) => {  
  return (
    <video 
      style={{
        position,
        width: size.width,
        height: size.height
      }}  
      src={src}
    />
  );
}

export default Overlay;  // Keep this export statement, remove the previous one
