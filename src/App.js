import React from 'react';
import Display from './Display';
import "./App.css";

class App extends React.Component {
  state = {
    operation: "",
    flip: false,
    num1: "",
    num2: "",
    answer: 0
  }

  clearCount = () => {
    this.setState({num1: "", num2: "", flip: false, answer: 0});
  }

  signChange = () => {
    if(!this.state.flip && this.state.num1 !== ""){
      if(this.state.num1.includes("-")){
        this.setState(prevState => ({num1: `${prevState.num1.replace('-', '')}`}))
      } else {
        this.setState(prevState => ({num1: `-${prevState.num1}`}))
      }

    } else if(this.state.flip && this.state.num2 !== ""){
      if(this.state.num2.includes("-")){
        this.setState(prevState => ({num2: `${prevState.num2.replace('-', '')}`}))
      } else {
        this.setState(prevState => ({num2: `-${prevState.num2}`}))
      }
    }

  }

  addNumberToCount = (event) => {
    const {innerText} = event.target;

    this.setState(prevState => {
      if(this.state.num1.length < 10 && !this.state.flip && this.state.num1 !== "0"){
        return {
          num1 : `${prevState.num1}${innerText}`,
          answer: 0
        }
      } else if(this.state.num2.length < 10 && this.state.flip && this.state.num2 !== "0"){
        return {
          num2 : `${prevState.num2}${innerText}`,
          answer: 0
        }
      }
    })
  }

  addDecimal = (event) => {
    const {innerText} = event.target;
    let num1Dots = 0;
    let num2Dots = 0;

    for (let i = 0; i < this.state.num1.length; i++) {
      if(this.state.num1[i] === "."){
        num1Dots++;
      }
    }

    for (let i = 0; i < this.state.num2.length; i++) {
      if(this.state.num2[i] === "."){
        num2Dots++;
      }
    }

    this.setState(prevState => {
      if(this.state.num1 === ""){
        return {
          num1 : `0${innerText}`,
          answer: 0
        }
      }
      if(this.state.num2 === ""){
        return {
          num2 : `0${innerText}`,
          answer: 0
        }
      }
      if(num1Dots < 1 && !this.state.flip) {
        return {
          num1 : `${prevState.num1}${innerText}`,
          answer: 0
        }
      } else if(num2Dots < 1 && this.state.flip) {
        return {
          num2 : `${prevState.num2}${innerText}`,
          answer: 0
        }
      } else {
        return null;
      }

    });
  }


  operations = (event) => {
    const {innerText} = event.target;

    this.setState(prevState => {
      let sign;
      if(innerText === "X"){
        sign = "*";
      }
      if(innerText === "÷"){
        sign = "/";
      }
      if(innerText === "-"){
        sign = "-"
      }
      if(innerText === "+"){
        sign = "+"
      }
      return {
        operation: sign,
        flip: true
      }
    })
  }

  equate = () => {
    const num1 = this.state.num1;
    const num2 = this.state.num2;
    const sign = this.state.operation;
    if(num1 !== "" && num2 !== ""){
      const answer = eval(num1 + sign + num2);
      this.setState({flip: false, num1: "", num2 : "", answer: answer});
    }
  }

  getPercentage = () => {
    let num;
    if(!this.state.flip && this.state.num1 !== ""){
      num = (parseFloat(this.state.num1) / 100).toString();
      this.setState({num1: num});
    } else if(this.state.flip && this.state.num2 !== ""){
      num = (parseFloat(this.state.num1) / 100).toString();
      this.setState({num2: num});
    }

  }


  render(){
    return (
      <div className="main-grid">
        <Display answer={this.state.answer} flip={this.state.flip} num1={this.state.num1} num2={this.state.num2}/>
        <div onClick={this.clearCount} className="button">
          <h1>AC</h1>
        </div>
        <div onClick={this.signChange} className="button">
          <h1>+/-</h1>
        </div>
        <div onClick={this.getPercentage} className="button">
          <h1>%</h1>
        </div>
        <div onClick={this.operations} className="button column-4">
          <h1>÷</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>7</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>8</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>9</h1>
        </div>
        <div onClick={this.operations} className="button column-4">
          <h1>X</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>4</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>5</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>6</h1>
        </div>
        <div onClick={this.operations} className="button column-4">
          <h1>-</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>1</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>2</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button">
          <h1>3</h1>
        </div>
        <div onClick={this.operations} className="button column-4">
          <h1>+</h1>
        </div>
        <div onClick={this.addNumberToCount} className="button zero">
          <h1>0</h1>
        </div>
        <div onClick={this.addDecimal} className="button">
          <h1>.</h1>
        </div>
        <div onClick={this.equate} className="button column-4">
          <h1>=</h1>
        </div>
      </div>
    );
  }
}

export default App;
