import React from 'react';
import '../App.css'; 

const Card = ({ title, summary ,onClick  }) => {
  const truncateSummary = (text) => {
    return text.split(' ').slice(0, 10).join(' ') + (text.split(' ').length > 10 ? '...' : '');
  };

  return (
    <div className="card" onClick={onClick}>
      <h2 className="card-title">{title}</h2>
       <p>{truncateSummary(summary)}</p>
    </div>
  );
};

export default Card;
