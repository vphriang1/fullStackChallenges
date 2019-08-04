import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <hr />
        <h2 id="timer-label">{`${this.props.phase}`}</h2>
        <h3 id="time-left">{`${this.props.timer}`}</h3>
        <button id="start_stop" onClick={this.props.countDown}>
          Start-Stop
        </button>
        <button id="reset" onClick={this.props.reset}>
          Refresh
        </button>
      </div>
    );
  }
}
