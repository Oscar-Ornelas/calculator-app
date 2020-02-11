import React from 'react';
import CalculatorComponent from './CalculatorComponent';
import AnswerDisplay from './AnswerDisplay';

class Calculator extends React.Component {
  state = {
    operation: "",
    nums: ["", ""],
    turn: 0,
    answer: 0
  }

  clear = () => {
    this.setState({ nums: ["",""], turn: 0, answer: 0} );
  }

  signChange = () => {
    const nums = this.state.nums;
    const turn = this.state.turn;

    if(nums[turn] !== "" && nums[turn] !== "0" && nums[turn] !== "0.0" && nums[turn] !== "NaN"){

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
    const turn = this.state.turn;

    this.setState(prevState => {
      if(!turn && prevState.nums[0] === this.state.answer){
        return {
          nums: [innerText, ""],
          answer: 0
        }
      } else if(nums[turn].length < 10 && nums[turn] !== "0" && nums[turn] !== "Infinity" & nums[turn] !== "NaN"){
          return {
            nums : !turn ? [`${prevState.nums[0]}${innerText}`, prevState.nums[1]]
                         : [prevState.nums[0], `${prevState.nums[1]}${innerText}`]
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
      if(numDots < 1 && nums[turn] !== "" && nums[turn] !== "Infinity" && nums[turn] !== "NaN") {
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

  backspace = (event) => {
    const turn = this.state.turn;

    this.setState(prevState => ({nums: (!turn && prevState.nums[turn] !== "Infinity" &&  prevState.nums[turn] !== "NaN")
                                       ? [prevState.nums[0].slice(0, -1), prevState.nums[1]]
                                       : [prevState.nums[0], prevState.nums[1].slice(0, -1)] }))
  }


  chooseOperation = (event) => {
    const {innerText} = event.target;
    let sign;

    if(this.state.nums[this.state.turn] !== "NaN"){
      if(innerText === "+" || innerText === "-"){
        sign = innerText;
      } else if(innerText === "X"){
        sign = "*";
      } else {
        sign = "/";
      }

      this.setState({ operation: sign, turn: 1 });
    }
  }

  equate = () => {
    const operation = this.state.operation;
    const nums = this.state.nums;

    if(nums[0] !== "" && nums[1] !== "" && nums[0] !== "NaN" && nums[1] !== "NaN")
    {
      let answer = eval(`${this.state.nums[0]}  ${operation} ${this.state.nums[1]}`);
      answer = (Math.round(answer * 10000) / 10000).toString();
      this.setState({turn: 0, nums: [answer, ""], answer: answer});
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
        nums={this.state.nums}
        turn={this.state.turn}
        />

        <CalculatorComponent
          backspace={this.backspace}
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
