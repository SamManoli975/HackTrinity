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
  const [responseMessage, setResponseMessage] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const postData = {
      userInput: inputValue, // Create an object to send to the server
    };

    try {
      const response = await fetch('http://localhost:5001/hello', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(postData), // Convert the data to a JSON string
      });

      if (response.ok) {
        const result = await response.json(); // Parse the JSON response
        setResponseMessage(`Data sent successfully: ${result.message}`); // Update response message
        setInputValue(''); // Clear the input after submission
      } else {
        setResponseMessage('Error sending data'); // Handle response error
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setResponseMessage('Error sending data'); // Handle catch error
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
