// src/App.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import './App.css';
import Card from './components/card'; 
import Overlay from './components/overlay';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [manipulatedValue, setManipulatedValue] = useState('');
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]); // Renamed to lowercase `data` for convention

  // Set initial data when the component mounts
  useEffect(() => {
    setData([
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 1", summary: "This is a summary of Card 1." },
      { title: "Card 2", summary: "This is a summary of Card 2." },
      { title: "Card 3", summary: "This is a summary of Card 3." }
    ]);
  }, []); // Empty dependency array means this runs once after initial render

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/manipulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setManipulatedValue(data.result); // Set the result
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  const closeOverlay = () => {
    setSelectedCard(null);
  };

  return (
    <div className="body">
      <div className="App">
        <header className="App-header">

        {/* <form className="search" onSubmit={handleSubmit}>
            <input
              classname="searchbar"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter text"
              style={{ padding: '10px', fontSize: '16px', textAlign: 'center' }}
            />
            <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
              Submit
            </button>
          </form> */}
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
                summary={card.summary} 
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          

          {manipulatedValue && (
            <div style={{ marginTop: '20px', fontSize: '18px', color: '#61dafb' }}>
              Manipulated Result: {manipulatedValue}
            </div>
          )}

          {error && (
            <div style={{ marginTop: '20px', fontSize: '18px', color: 'red' }}>
              Error: {error}
            </div>
          )}
          
          <Overlay selectedCard={selectedCard} closeOverlay={closeOverlay} />
        </header>
      </div>
    </div>
  );
}

export default App;
