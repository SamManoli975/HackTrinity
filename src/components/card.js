import React from 'react';
import '../App.css'; 

const Card = ({ title, summary ,onClick  }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2 className="card-title">{title}</h2>
      <p className="card-summary">{summary}</p>
    </div>
  );
};

export default Card;
