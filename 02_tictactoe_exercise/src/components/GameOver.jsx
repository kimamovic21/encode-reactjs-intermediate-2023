import React from 'react'

const GameOver = ({ winner, gameOver, handleResetGame }) => {
  return (
    <div>
        {gameOver && (
            <div className='game-over-wrapper'>
                <h3 style={{ color: 'red' }}>Game Over!</h3>
                
                {winner ? (
                    <h3>Winner is: <b>{winner}</b></h3>
                ) : (
                    <p>Draw!</p>
                )}

                <button className='new-game-btn' onClick={handleResetGame}>
                    Play New Game
                </button>
            </div>
        )}
    </div>
  );
};

export default GameOver;