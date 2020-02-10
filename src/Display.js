import React from 'react';

function Display(props){
  let display;
  if(props.flip) {
    display = props.num2;
  } else {
    display = props.num1;
  }

  return (
    <div className="display">
      <h1 className="count">{display.length === 0 ? props.answer : display}</h1>
    </div>
  )
}

export default Display;
