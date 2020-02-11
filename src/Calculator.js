import React from 'react';
import CalculatorComponent from './CalculatorComponent';
import AnswerDisplay from './AnswerDisplay';

class Calculator extends React.Component {
  state = {
    operation: "",
    nums: ["", ""],
    answer: 0,
    turn: 0
  }

  clear = () => {
    this.setState({ nums: ["",""], turn: 0, answer: 0} );
  }

  signChange = () => {
    const nums = this.state.nums;
    const turn = this.state.turn;

    if(nums[turn] !== "" && nums[turn] !== "0"){

      if(nums[turn].includes("-")){
        this.setState(prevState => ({ nums: !turn ? [`${prevState.nums[0].replace('-', '')}`, prevState.nums[1]]
                                                  : [prevState.nums[0], `${prevState.nums[1].replace('-', '')}`] }));
      } else {
        this.setState(prevState => ({ nums: !turn ? [`-${prevState.nums[0]}`, prevState.nums[1]]
                                                  : [prevState.nums[0], `-${prevState.nums[1]}`] }));
      }

    }
  }

  addNumber = (event) => {
    const {innerText} = event.target;
    const nums = this.state.nums;

    this.setState(prevState => {
      if(nums[this.state.turn].length < 10 && !this.state.flip && nums[this.state.turn] !== "0"){
        return {
          nums : !this.state.turn ? [`${prevState.nums[0]}${innerText}`, prevState.nums[1]]
                                  : [prevState.nums[0], `${prevState.nums[1]}${innerText}`],
          answer: 0
        }
      }
    })
  }

  addDecimal = (event) => {
    const {innerText} = event.target;
    const nums = this.state.nums;
    const turn = this.state.turn;
    let numDots = 0;

    for (let i = 0; i < nums[turn].length; i++) {
      if(nums[turn][i] === "."){
        numDots++;
      }
    }

    this.setState(prevState => {
      if(numDots < 1 && nums[turn] !== "") {
        return {
          nums : !turn ? [`${prevState.nums[0]}${innerText}`, prevState.nums[1]]
                       : [prevState.nums[0], `${prevState.nums[1]}${innerText}`]
        }
      } else if(nums[turn] === ""){
        return {
          nums : !turn ? [`0${innerText}`, prevState.nums[1]]
                       : [prevState.nums[0], `0${innerText}`]
        }
      }
    });
  }


  chooseOperation = (event) => {
    const {innerText} = event.target;
    let sign;

    if(innerText === "+" || innerText === "-"){
      sign = innerText;
    } else if(innerText === "X"){
      sign = "*";
    } else {
      sign = "/";
    }

    this.setState({ operation: sign, turn: 1 });

  }

  equate = () => {
    const operation = this.state.operation;
    if(this.state.nums[0] !== "" && this.state.nums[1] !== ""){
      let answer = eval(`${this.state.nums[0]}  ${operation} ${this.state.nums[1]}`);
      answer = Math.round(answer * 10000) / 10000;
      this.setState({turn: 0, nums: ["",""], answer: answer});
    }
  }

  calculatePercentage = () => {
    const turn = this.state.turn;
    const num = (parseFloat(this.state.nums[turn]) / 100).toString();

    this.setState(prevState => ({ nums: !turn ? [num, prevState.nums[1]]
                                              : [prevState.nums[0], num] }));
  }


  render(){
    return (
      <>
        <AnswerDisplay
        answer={this.state.answer}
        nums={this.state.nums}
        turn={this.state.turn}
        />

        <CalculatorComponent
          calculatePercentage={this.calculatePercentage}
          equate={this.equate}
          chooseOperation={this.chooseOperation}
          addDecimal={this.addDecimal}
          addNumber={this.addNumber}
          signChange={this.signChange}
          clear={this.clear}
        />
      </>
    )
  }
}

export default Calculator;
