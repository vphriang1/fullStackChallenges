import { connect } from 'react-redux';
import React from 'react';
import sum from '../actions/index';
import Output from './Output.jsx';

function mapDispatchToProps(dispatch) {
  return { sum: result => dispatch(sum(result)) };
}

const mapStateToProps = state => {
  state.results.map(el => {});
  return { states: state.results };
};

class Calculator extends React.Component {
  constructor({ states }) {
    super({ states });
    this.state = {
      value1: null,
      value2: null,
      operator: '',
      display: 0,
      lastState: this.props.states[this.props.states.length - 1].value
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.decimal = this.decimal.bind(this);
    this.clear = this.clear.bind(this);

    this.calculate = this.calculate.bind(this);
  }

  add() {
    const sum = parseFloat(this.state.value1) + parseFloat(this.state.value2);

    this.props.sum({
      value: `${this.state.value1} + ${this.state.value2} = ${sum}`
    });
    return sum;
  }

  subtract() {
    const sum = this.state.value1 - this.state.value2;

    this.props.sum({
      value: `${this.state.value1} - ${this.state.value2} = ${sum}`
    });
    return sum;
  }
  multiply() {
    const sum = this.state.value1 * this.state.value2;

    this.props.sum({
      value: `${this.state.value1} * ${this.state.value2} = ${sum}`
    });
    return sum;
  }
  divide() {
    const sum = this.state.value1 / this.state.value2;

    this.props.sum({
      value: `${this.state.value1} / ${this.state.value2} = ${sum}`
    });
    return sum;
  }
  decimal() {}

  clear(state) {
    console.log('in clear state');

    this.setState({
      value1: null,
      value2: null,
      operator: '',
      display: 0
    });
  }
  calculate() {
    let sum;
    if (this.state.operator == '+') {
      sum = this.add();
    } else if (this.state.operator == '-') {
      sum = this.subtract();
    } else if (this.state.operator == '*') {
      sum = this.multiply();
    } else {
      sum = this.divide();
    }
    return sum;
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      target: { id, value }
    } = event;

    console.log('button id: ' + id);
    // console.log('typeof value: '+typeof value);

    // if there is no num in the left operand add number to left operand if num is clicked

    // if there is a num in the left operand and no operation has been clicked attach the new value to the left operand if num is clicked

    // if an operation is clicked and there is already a right value calculate the arithmetic then set the ans to the left value and set the operation state to the clicked operation

    // if an operation is clicked and there is no left value make the left value 0 and set the operation state

    // if an operation is clicked and there is no right value set the state to remember the operation

    // if a number is clicked and there is already an operation state set the 2nd operand to the clicked number when 2nd operand is null

    // if there is a number in the right operand and a number is clicked attach the clicked number

    // if the equal button is clicked do the calculation and save this whole calculation inside the state

    // if the clear button is clicked reset everything to default

    if (!isNaN(parseFloat(value))) {
      if (this.state.value1 == null) {
        console.log('in first left operand with ' + value);
        this.setState({
          value1: value,
          display: value
        });
      } else if (this.state.operator == '') {
        console.log('attaching more to left operand');
        this.setState({
          value1:
            this.state.value1 == '0' && value == '0'
              ? this.state.value1
              : `${this.state.value1}${value}`,
          display:
            this.state.value1 == '0' && value == '0'
              ? this.state.value1
              : `${this.state.value1}${value}`
        });
      } else if (this.state.value2 == null) {
        // after the the prev 2 vars have been assigned
        this.setState({
          value2: value,
          display: value
        });
      } else {
        console.log('attach more to the right');
        this.setState({
          value2: `${this.state.value2}${value}`,
          display: `${this.state.value2}${value}`
        });
      }
    } else if (
      id == 'add' ||
      id == 'subtract' ||
      id == 'multiply' ||
      id == 'divide'
    ) {
      // calc. the arithmetic //

      if (this.state.operator == '=') {
        this.setState({
          value1: this.state.display,
          operator: value
        });
      } else if (this.state.value1 == null) {
        this.setState({
          value1: 0,
          operator: value
        });
      } else if (this.state.value2 == null) {
        this.setState({ operator: value });
      } else {
        const sum = this.calculate();

        this.setState({
          display: sum,
          value1: sum,
          value2: null,
          operator: value
        });
      }

      // make the ans the left
      // save equations in the redux state
    } else if (id == 'clear') {
      this.clear();
    } else if (id == 'equals') {
      const sum = this.calculate();
      this.setState({
        operator: '=',
        display: sum,
        value1: null,
        value2: null
      });
    } else if (id == 'decimal') {
      // make the current value a string with a dot

      // make sure you can't add another . if there is already one

      if (this.state.operator == '') {
        if (this.state.value1 == null) {
          this.setState({
            value1: '0.',
            display: '0.'
          });
        } else if (!this.state.value1.toString().includes('.')) {
          console.log('attach typeof v1?: ' + typeof this.state.value1);
          const value1 = this.state.value1 + '.';
          this.setState({
            value1: value1,
            display: value1
          });
        }
      } else {
        if (this.state.value2 == null) {
          this.setState({
            value2: '0.',
            display: '0.'
          });
        } else if (!this.state.value2.toString().includes('.')) {
          const value2 = this.state.value2 + '.';
          this.setState({
            value2: value2,
            display: value2
          });
        }
      }
    }
  } // handleSubmit

  render() {
    return (
      <div>
        <form>
          <input type="submit" id="one" value="1" onClick={this.handleSubmit} />
          <input type="submit" id="two" value="2" onClick={this.handleSubmit} />
          <input
            type="submit"
            id="three"
            value="3"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="four"
            value="4"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="five"
            value="5"
            onClick={this.handleSubmit}
          />
          <input type="submit" id="six" value="6" onClick={this.handleSubmit} />
          <input
            type="submit"
            id="seven"
            value="7"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="eight"
            value="8"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="nine"
            value="9"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="zero"
            value="0"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="decimal"
            value="."
            onClick={this.handleSubmit}
          />
          <input type="submit" id="add" value="+" onClick={this.handleSubmit} />
          <input
            type="submit"
            id="subtract"
            value="-"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="multiply"
            value="*"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="divide"
            value="/"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="equals"
            value="="
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            id="clear"
            value="Clear"
            onClick={this.handleSubmit}
          />
        </form>
        <Output output={this.state} />
      </div>
    );
  }
}

const ReduxCalculator = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);

export default ReduxCalculator;
