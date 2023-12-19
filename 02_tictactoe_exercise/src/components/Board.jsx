import React from 'react';

const Board = ({ boardValues, handleClick }) => {
  return (
    <div className='board'>
       {boardValues.map((value, index) => {
           return  (
              <div 
                 key={index} 
                 className="field" 
                 onClick={() => handleClick(index)}
              >
                {value}
              </div>
          )
       })}
    </div>
  );
};

export default Board;
