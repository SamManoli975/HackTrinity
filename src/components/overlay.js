// src/components/overlay.js
import React from 'react';
import '../App.css'; // Add your CSS file for styling if needed

const Overlay = ({ selectedCard, closeOverlay }) => {
  if (!selectedCard) return null; // Don't render anything if no card is selected

  return (
    <div className="overlay" onClick={closeOverlay}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedCard.title}</h2>
        <p>{selectedCard.summary}</p>
        <button onClick={closeOverlay}>Close</button>
      </div>
    </div>
  );
};
{/*export */}

export default Overlay; 
