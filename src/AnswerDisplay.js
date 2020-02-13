import React from 'react';

function AnswerDisplay(props){
  return (
    <div className="display">
      <h1 className={props.equation.length < 10 ? "equation-big" : "equation-small"} >{props.equation}</h1>
    </div>
  )
}

export default AnswerDisplay;
