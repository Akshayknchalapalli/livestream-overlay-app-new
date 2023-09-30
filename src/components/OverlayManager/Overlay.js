function Overlay({ position, size, content }) {

  // Style based on props 
  const overlayStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height
  };

  return (
    <div className="overlay" style={overlayStyle}>
      <div className="overlay-content">
        {content}
      </div>
    </div>
  );

}