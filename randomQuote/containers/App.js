import React, { Component } from 'react';

const database = [
  { name: 'Vigeneareay', value: 'she is so beautiful' },
  { name: 'Wing', value: 'she is amazing' },
  { name: 'Vidget', value: 'she is lovely' }
];
export default class App extends Component {
  constructor(props) {
    super(props);
    let index = Math.floor(Math.random() * database.length);
    this.state = {
      person: database[index].name,
      quote: database[index].value
    };

    this.updateQuote = this.updateQuote.bind(this);
  }

  updateQuote(x, y) {
    this.setState({
      person: x,
      quote: y
    });
  }
  render() {
    return (
      <div>
        <h1>Quote:</h1>
        <DisplayQuote person={this.state.person} quote={this.state.quote} />
        <a id="tweet-quote" href='twitter.com/intent/tweet"'>
          <i className="fa fa-twitter" />
        </a>
        <PickQuote database={database} updateQuote={this.updateQuote} />
      </div>
    );
  }
}

class PickQuote extends React.Component {
  constructor(props) {
    super(props);
    this.changeQuote = this.changeQuote.bind(this);
    this.getNum = this.getNum.bind(this);
  }
  changeQuote() {
    console.log('change?');
    this.val = this.getNum();
    this.props.updateQuote(database[this.val].name, database[this.val].value);
  }
  getNum() {
    return Math.floor(Math.random() * database.length);
  }
  render() {
    return (
      <button onClick={this.changeQuote} id="new-quote">
        Next
      </button>
    );
  }
}

const DisplayQuote = props => {
  return (
    <div>
      <p id="text">{props.quote}</p>
      <p id="author">{props.person}</p>
    </div>
  );
};
