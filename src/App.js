import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card'; 
import Overlay from './components/overlay';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]);

  // Set initial data when the component mounts
  useEffect(() => {
    setData([
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 3", summary: "This is a summary of Card 3." }
    ]);
  }, []); // Empty dependency array means this runs once after initial render

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const postData = {
      userInput: inputValue,
    };

    try {
      const response = await fetch('http://localhost:5001/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
      
        setResponseMessage(response.summary); // Store the summary for the overlay
        console.log(`Summary: ${result.summary}`);
        setInputValue('');
      } else {
        setResponseMessage('Error sending data');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error sending data');
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeOverlay = () => {
    setSelectedCard(null);
  };

  return (
    <div className="body">
      <div className="App">
        <header className="App-header">
          <form className="search" onSubmit={handleSubmit}>
            <input
              className="searchbar"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter text"
            />
            <button type="submit">
              Submit
            </button>
          </form>

          <div className="card-container">
            {data.map((card, index) => (
              <Card 
                key={index} 
                title={card.title} 
                summary={responseMessage} // Use the summary from the API response
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          {/* Summary Output Container
          {responseMessage && (
            <div 
              className="summary-container" // Use a styled class
              style={{ marginTop: '20px', fontSize: '18px', color: '#61dafb' }}
            >
              <h3>Summary:</h3>
              <div className="summary-content">
                {responseMessage}
              </div>
            </div>
          )} */}

          <Overlay 
            selectedCard={selectedCard} 
            closeOverlay={closeOverlay} 
            summary={responseMessage} // Pass summary to Overlay
          />
        </header>
      </div>
    </div>
  );
}

export default App;
