import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card'; 
import Overlay from './components/overlay';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]);

  // Set initial data when the component mounts
  useEffect(() => {
    setData([
      { title: "Card 2", summary: "This is a summary of Card 1." },
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
      const response = await fetch('http://localhost:5001/summarise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
      
        setResponseMessage(result.similarities); // Store the summary for the overlay
        console.log(`Summary: ${result.similarities}`);
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
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-900">
          
      <form class="max-w-md mx-auto dark pt-10" onSubmit={handleSubmit}>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" value={inputValue} onChange={handleChange} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for AI verdict + Similar Cases..." required />
          <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>

        <div className="card-container">
            {/*data.map((card, index) => (
              <Card 
                key={index} 
                title={card.title} 
                summary={responseMessage} // Use the summary from the API response
                onClick={() => handleCardClick(card)}
              />
            ))*/
            
            responseMessage.map((x, index) => (
              <Card 
              summary={x.data} 
              title={x.verdict}
              key={index}
              onClick={() => handleCardClick(x.data)}
              />
            ))
            
            
            }
          </div>

          <Overlay 
            selectedCard={selectedCard} 
            closeOverlay={closeOverlay} 
            summary={responseMessage} // Pass summary to Overlay
          />
      </div>
    </div>
  );
}

export default App;