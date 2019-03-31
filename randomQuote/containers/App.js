import React, { Component } from 'react';

const DisplayQuote = props => {
  return (
    <div>
      <p id="text">{props.quote}</p>
      <p id="author">{props.person}</p>
    </div>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Quote:</h1>
        <GenerateQuote />
      </div>
    );
  }
}

class GenerateQuote extends React.Component {
  constructor(props) {
    super(props);
    this.database = [
      { name: 'Vigeneareay', value: 'she is so beautiful' },
      { name: 'Wing', value: 'she is amazing' },
      { name: 'Vidget', value: 'she is lovely' }
    ];
    this.val = this.getNum();
    this.state = {
      person: this.database[this.val].name,
      quote: this.database[this.val].value
    };
    this.changeQuote = this.changeQuote.bind(this);
    this.getNum = this.getNum.bind(this);
  }
  changeQuote() {
    this.val = this.getNum();
    this.setState({
      person: this.database[this.val].name,
      quote: this.database[this.val].value
    });
  }
  getNum() {
    return Math.floor(Math.random() * this.database.length);
  }
  render() {
    return (
      <div>
        <DisplayQuote person={this.state.person} quote={this.state.quote} />
        <a id="tweet-quote" href='twitter.com/intent/tweet"'>
          <i class="fa fa-twitter-square" />
        </a>
        <button onClick={this.changeQuote} id="new-quote">
          Next
        </button>
      </div>
    );
  }
}
