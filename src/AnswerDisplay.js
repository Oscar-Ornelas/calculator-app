import React from 'react';

function AnswerDisplay(props){
  let display;
  if(props.turn) {
    display = props.nums[1];
  } else {
    display = props.nums[0];
  }

  return (
    <div className="display">
      <h1 className="count">{display.length === 0 ? "0" : display}</h1>
    </div>
  )
}

export default AnswerDisplay;
