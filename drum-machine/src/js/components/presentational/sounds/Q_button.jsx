import React, { Component } from 'react';
import soundFile from '../correctPing.mp3';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

export default class Q_button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="drum-pad"
        id="clip_Q"
        type="submit"
        onClick={e => this.props.playAudio('q')}
      >
        q
        <audio className="clip" id="q" src={soundFile} />
        <React.Fragment>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyValue="q"
            onKeyHandle={this.props.handleKeyPress}
          />
        </React.Fragment>
      </button>
    );
  }
}
