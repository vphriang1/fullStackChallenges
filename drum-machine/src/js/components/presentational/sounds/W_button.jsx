import React, { Component } from 'react';
import soundFile from '../correctPing.mp3';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

export default class W_button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="drum-pad"
        id="clip_W"
        type="submit"
        onClick={e => this.props.playAudio('w')}
      >
        w
        <audio className="clip" id="w" src={soundFile} />
        
        <React.Fragment>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyValue="w"
            onKeyHandle={this.props.handleKeyPress}
          />
        </React.Fragment>
  
      </button>
    );
  }
}
