import React from 'react';
import CalculatorComponent from './CalculatorComponent';
import AnswerDisplay from './AnswerDisplay';

class Calculator extends React.Component {
  state = {
    equation: "0"
  }

  clear = () => {
    this.setState({equation: "0"} );
  }

  signChange = () => {
    const equation = this.state.equation

    if(equation !== "" && equation !== "0" && equation !== "0.0" && equation !== "0." && equation !== "NaN"){
        this.setState(prevState => {
          const splitEquation = prevState.equation.split(" ");
          const lastNumber = splitEquation[splitEquation.length - 1];
          if(!lastNumber.includes("-")){
            return {
              equation: `${splitEquation.splice(0, splitEquation.length-1).join(" ")} -${lastNumber}`
            }
          } else {
            return {
              equation: `${splitEquation.splice(0, splitEquation.length-1).join(" ")} ${lastNumber.slice(1)}`
            }
          }
        });
    }
  }

  addNumber = (event) => {
    const {innerText} = event.target;
    const equation = this.state.equation;

    this.setState(prevState => {
      if(equation === this.state.answer || equation === "0"){
        return {
          equation: `${innerText}`,
          answer: 0
        }
      } else if(equation.length < 20 && equation !== "0" && equation !== "Infinity" & equation !== "NaN"){
          return {
            equation: `${prevState.equation}${innerText}`
          }
        }
      })
    }

  addDecimal = (event) => {
    this.setState(prevState => {
      const splitEquation = prevState.equation.split(" ");
      const lastNumber = splitEquation[splitEquation.length - 1];
      let numDots = 0;

      for (let i = 0; i < lastNumber.length; i++) {
        if(lastNumber[i] === "."){
          numDots++;
        }
      }

      if(numDots < 1 && lastNumber !== "Infinity" && lastNumber !== "NaN") {
        return {
          equation : `${splitEquation.splice(0, splitEquation.length-1).join(" ")} ${lastNumber}.`
        }
      }
    });
  }

  backspace = (event) => {
    this.setState(prevState => {
      const equation = prevState.equation;
      if(equation !== "Infinity" && equation !== "NaN") {
        if(equation[equation.length - 1] === " "){
          return {
            equation: `${equation.slice(0, -3)}`
          }
        } else if(equation[equation.length-2] === "-"){
          return {
            equation: `${equation.slice(0, -3)} `
          }
        } else if(equation.length === 1){
          return {
            equation: "0"
          }
        } else {
          return {
            equation: equation.slice(0, -1)
          }
        }
      }
    });
  }


  chooseOperation = (event) => {
    const {innerText} = event.target;
    let sign;

    if(this.state.equation !== "NaN"){
      if(innerText === "+" || innerText === "-"){
        sign = innerText;
      } else if(innerText === "X"){
        sign = "*";
      } else {
        sign = "/";
      }

      this.setState(prevState => {
        const prevEquation = prevState.equation;
        const lastChar = prevEquation[prevEquation.length - 1];
        const secondToLastChar = prevEquation[prevEquation.length - 2];
        if(secondToLastChar === "*" || secondToLastChar === "+"
           || secondToLastChar === "/" || secondToLastChar === "-") {
             const slicedString = prevEquation.substring(0, prevEquation.length - 3);
             return {
               equation: `${slicedString} ${sign} `
             }
           } else if(lastChar !== " " && lastChar !== "-"){
               return {
                 equation: `${prevEquation} ${sign} `
               }
             }
      });
    }
  }

  equate = () => {
    const equation = this.state.equation;

    if(equation !== "" && equation !== "NaN" && equation !== "NaN" && equation[equation.length - 1] !== " " && equation[equation.length - 1] !== "-")
    {
      let answer = eval(this.state.equation);
      answer = (Math.round(answer * 10000) / 10000).toString();
      this.setState({turn: 0, answer: answer, equation: answer});
    }
  }

  calculatePercentage = () => {
    this.setState(prevState => {
      const splitEquation = prevState.equation.split(" ");
      const lastNumber = splitEquation[splitEquation.length - 1];
      if(lastNumber !== ""){
        const num = (parseFloat(lastNumber) / 100).toString();
        return {
          equation: `${splitEquation.splice(0, splitEquation.length-1).join(" ")} ${num}`
        }
      }
    });
  }


  render(){
    return (
      <>
        <AnswerDisplay
        equation={this.state.equation}
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
