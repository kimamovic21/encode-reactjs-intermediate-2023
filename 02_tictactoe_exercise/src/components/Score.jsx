import React from 'react';

const Score = ({ score }) => {
  return (
    <div>
      <h2>Score</h2>
      <p>Player X Victories: {score.X}</p>
      <p>Player O Victories: {score.O}</p>
      <p>Draws: {score.DRAWS}</p>
    </div>
  );
};

export default Score;
