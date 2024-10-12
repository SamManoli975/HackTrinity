import React from 'react';

const Overlay = ({ selectedCard, closeOverlay, summary }) => {
  if (!selectedCard) return null; // If no card is selected, return null

  return (
    <div className="overlay" onClick={closeOverlay}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedCard.title}</h2>
        <p>{summary}</p> {/* Display the summary in the overlay */}
        <button onClick={closeOverlay}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
