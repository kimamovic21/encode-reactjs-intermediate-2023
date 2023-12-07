import React, { useState } from 'react';

const App = () => {
  const [activePlayer, setActivePlayer] = useState('X');  // console.log(activePlayer);
  const [boardValues, setBoardValues] = useState(Array(9).fill(null)); // console.log(boardValues);

  const handleClick = (index) => { // console.log(index);
    const boardValuesCopy = [...boardValues]; // shallow copy
    boardValuesCopy[index] = activePlayer;  // dynamically set activePlayer value based on index
    setBoardValues(boardValuesCopy);
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  };    

  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <div className='board'>
        <div className="field" onClick={() => handleClick(0)}>1</div>
        <div className="field" onClick={() => handleClick(1)}>2</div>
        <div className="field" onClick={() => handleClick(2)}>3</div>
        <div className="field" onClick={() => handleClick(3)}>4</div>
        <div className="field" onClick={() => handleClick(4)}>5</div>
        <div className="field" onClick={() => handleClick(5)}>6</div>
        <div className="field" onClick={() => handleClick(6)}>7</div>
        <div className="field" onClick={() => handleClick(7)}>8</div>
        <div className="field" onClick={() => handleClick(8)}>9</div>
      </div>
    </div>
  );
};

export default App;