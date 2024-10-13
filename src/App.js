import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card'; 
import Overlay from './components/overlay';
import SearchForm from './components/search'

const initialCardData = [
  { title: "Card 1", summary: "This is a summary of Card 1." },
  { title: "Card 2", summary: "This is a summary of Card 2." },
  { title: "Card 3", summary: "This is a summary of Card 3." }
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]);

  // Set initial card data when the component mounts
  useEffect(() => {
    setData(initialCardData);
  }, []);

  // Handles form input changes
  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    const postData = {
      userInput: inputValue,
    };
  
    try {
      const result = await sendDataToServer(postData); // Send data to server
      handleServerResponse(result); // Handle the server response
    } catch (error) {
      handleError(error); // Handle any errors
    } finally {
      setInputValue(''); // Clear the input after the request
    }
  };
  
  // Helper function to send data to the server
  const sendDataToServer = async (postData) => {
    const response = await fetch('http://localhost:5001/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send data');
    }
  
    return response.json(); // Parse the JSON response
  };
  
  // Helper function to handle the server response
  const handleServerResponse = (result) => {
    if (result && result.summary) {
      setResponseMessage(result.summary); // Set the summary from the result
      console.log(`Summary: ${result.summary}`);
    } else {
      setResponseMessage('Unexpected response format');
    }
  };
  
  // Helper function to handle errors
  const handleError = (error) => {
    console.error('Error:', error);
    setResponseMessage('Error sending data');
  };
  

  // handle clicing on a card
  const handleCardClick = (card) => setSelectedCard(card);

  // handle closing the overlay
  const closeOverlay = () => setSelectedCard(null);

  return (
    <div className="body">
      <div className="App">
        <header className="App-header">
        <SearchForm
            inputValue={inputValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          {/* Card Display */}
          <div className="card-container">
            {data.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                summary={responseMessage}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          {/* Overlay Display */}
          {selectedCard && (
            <Overlay 
              selectedCard={selectedCard}
              closeOverlay={closeOverlay}
              summary={responseMessage}
            />
          )}
        </header>
      </div>
    </div>
  );
}

export default App;
