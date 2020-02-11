import React from 'react';

function CalculatorComponent (props){
  return (
    <>
        <div onClick={props.clear} className="button row-2">
          <h1>AC</h1>
        </div>
        <div onClick={props.signChange} className="button row-2">
          <h1>+/-</h1>
        </div>
        <div onClick={props.calculatePercentage} className="button row-2">
          <h1>%</h1>
        </div>
        <div onClick={props.chooseOperation} className="button column-4">
          <h1>÷</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>7</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>8</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>9</h1>
        </div>
        <div onClick={props.chooseOperation} className="button column-4">
          <h1>X</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>4</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>5</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>6</h1>
        </div>
        <div onClick={props.chooseOperation} className="button column-4">
          <h1>-</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>1</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>2</h1>
        </div>
        <div onClick={props.addNumber} className="button">
          <h1>3</h1>
        </div>
        <div onClick={props.chooseOperation} className="button column-4">
          <h1>+</h1>
        </div>
        <div onClick={props.addNumber} className="button zero">
          <h1>0</h1>
        </div>
        <div onClick={props.addDecimal} className="button">
          <h1>.</h1>
        </div>
        <div onClick={props.equate} className="button column-4 equals">
          <h1>=</h1>
        </div>
      </>
  );
}

export default CalculatorComponent;
