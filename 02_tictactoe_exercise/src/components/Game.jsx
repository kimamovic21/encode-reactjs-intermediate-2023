import React, { useEffect, useState } from 'react';
import { WINNING_COMBINATIONS } from '../constants';

import Board from './Board';
import Score from './Score';
import GameOver from './GameOver';

const Game = () => {
  const [activePlayer, setActivePlayer] = useState('X');  
  const [boardValues, setBoardValues] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);  
  const [gameOver, setGameOver] = useState(false);  
  const [score, setScore] = useState({ X: 0, O: 0, DRAWS: 0 }); 

  const handleClick = (index) => { 
    if (boardValues[index] || gameOver) return;  

    const boardValuesCopy = [...boardValues]; 
    boardValuesCopy[index] = activePlayer;  

    setBoardValues(boardValuesCopy);
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  };
  
  const handleCheckForWinner = () => {
    let userWon = null;

    const hasWinner = WINNING_COMBINATIONS.some((combination) => {  
      const [firstIndex, secondIndex, thirdIndex] = combination;  

      if (boardValues[firstIndex] && 
          boardValues[firstIndex] === boardValues[secondIndex] && 
          boardValues[firstIndex] === boardValues[thirdIndex]
      ) {
        userWon = boardValues[firstIndex]; 
        return true;
      };

      return false;
    });

    if (hasWinner) {
      const scoreCopy = { ...score };
      scoreCopy[userWon] += 1;  

      setScore(scoreCopy);
      setWinner(userWon);
      setGameOver(true); 
    }; 

    const allFielsFilled = boardValues.every((value) => value); 

    if (!hasWinner && allFielsFilled) {
      const scoreCopy = { ...score };
      scoreCopy.DRAWS += 1;  

      setScore(scoreCopy);
      setGameOver(true);
    };
  };

  const handleResetGame = () => {
    setActivePlayer('X');
    setBoardValues(Array(9).fill(null));
    setGameOver(false);
    setWinner(null);
  };

  useEffect(() => {
    handleCheckForWinner(); // eslint-disable-next-line
  }, [boardValues]);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div>
        <Board 
            boardValues={boardValues} 
            handleClick={handleClick} 
        />
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Score score={score} />
        <GameOver 
            winner={winner} 
            gameOver={gameOver} 
            handleResetGame={handleResetGame}
        />
      </div>
    </>
  );
};

export default Game;