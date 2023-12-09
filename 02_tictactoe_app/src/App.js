import React, { useEffect, useState } from 'react';
import { WINNING_COMBINATIONS } from './constants.js';

const App = () => {
  const [activePlayer, setActivePlayer] = useState('X');  // console.log(activePlayer);
  const [boardValues, setBoardValues] = useState(Array(9).fill(null)); // console.log(boardValues);
  const [winner, setWinner] = useState(null);  // console.log(winner);
  const [gameOver, setGameOver] = useState(false);  // console.log(gameOver)
  const [score, setScore] = useState({ X: 0, O: 0, DRAWS: 0 });  // console.log(score);

  const handleClick = (index) => { // console.log(index);
    // if (boardValues[index] !== null) return;
    if (boardValues[index] || gameOver) return;  // null -> falsy  string -> truthy
    const boardValuesCopy = [...boardValues]; // shallow copy
    boardValuesCopy[index] = activePlayer;  // dynamically set activePlayer value based on index
    setBoardValues(boardValuesCopy);
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  };
  
  const handleCheckForWinner = () => {
    console.log('Check Winner');
    let userWon = null;
    const hasWinner = WINNING_COMBINATIONS.some((combination) => {  // console.log(combination);
      const [firstIndex, secondIndex, thirdIndex] = combination;  // array destructing
      if(boardValues[firstIndex] && 
         boardValues[firstIndex] === boardValues[secondIndex] && 
         boardValues[firstIndex] === boardValues[thirdIndex]
      ) {
        userWon = boardValues[firstIndex]; // console.log(userWon);
        return true;
      }

      return false;
    });
    // console.log(hasWinner);

    if (hasWinner) {
      const scoreCopy = {...score};
      scoreCopy[userWon] += 1;  
      console.log(scoreCopy);

      setScore(scoreCopy);
      setWinner(userWon); // console.log(winner);
      setGameOver(true); // console.log(gameOver);
    } 

    const allFielsFilled = boardValues.every((value) => value); // console.log(allFielsFilled);
    if (!hasWinner && allFielsFilled) {
      const scoreCopy = {...score}
      scoreCopy.DRAWS += 1;  
      // console.log(scoreCopy);

      setScore(scoreCopy);
      setGameOver(true);
    }
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

  // console.log(boardValues);

  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <div className='board'>
        <div className="field" onClick={() => handleClick(0)}>{boardValues[0]}</div>
        <div className="field" onClick={() => handleClick(1)}>{boardValues[1]}</div>
        <div className="field" onClick={() => handleClick(2)}>{boardValues[2]}</div>
        <div className="field" onClick={() => handleClick(3)}>{boardValues[3]}</div>
        <div className="field" onClick={() => handleClick(4)}>{boardValues[4]}</div>
        <div className="field" onClick={() => handleClick(5)}>{boardValues[5]}</div>
        <div className="field" onClick={() => handleClick(6)}>{boardValues[6]}</div>
        <div className="field" onClick={() => handleClick(7)}>{boardValues[7]}</div>
        <div className="field" onClick={() => handleClick(8)}>{boardValues[8]}</div>
      </div>

      {gameOver && (
        <div className='game-over-wrapper'>
          <h3>Game Over!</h3>
          {winner ? (<h3>Winner is: <b>{winner}</b></h3>) : <p>Draw</p>}
          <button className='new-game-btn' onClick={handleResetGame}>
            Play New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;