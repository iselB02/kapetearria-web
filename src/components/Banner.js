import React from 'react';
import Ratio from 'react-bootstrap/Ratio';
import './Banner.css'; // Your CSS file for any additional styling

function Banner() {
  const videoSrc = "video/vid1.mp4"; // Replace with your video path

  return (
    <div className="custom-video-container">
      <Ratio aspectRatio="16x9">
        <video
          autoPlay
          loop
          muted
          controls={false} // Set to false to hide controls if desired
          src={videoSrc}
          title="Kapeterria"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensures video covers the container
        >
          Your browser does not support the video tag.
        </video>
      </Ratio>
    </div>
  );
}

export default Banner;
