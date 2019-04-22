import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DrumMachine from '../presentational/DrumMachine.jsx';
import Display from '../presentational/Display.jsx';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: ``
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(sound) {
    this.setState({
      sound: sound
    });
  }
  render() {
    return (
      <div>
        <DrumMachine handleChange={this.handleChange} />
        <Display message={this.state.sound} />
      </div>
    );
  }
}

export default FormContainer;
const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
