import React, { Component } from 'react';
import soundFile from './correctPing.mp3';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import PropTypes from 'prop-types';

import Q_button from './sounds/Q_button.jsx';
import W_button from './sounds/W_button.jsx';

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      played: ''
    };
    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  playAudio(event) {
    console.log('audio');
    if (
      event == 'q' ||
      event == 'w' ||
      event == 'e' ||
      event == 'a' ||
      event == 's' ||
      event == 'd' ||
      event == 'z' ||
      event == 'x' ||
      event == 'c'
    ) {
      let audio = new Audio(soundFile);
      audio.play();
      this.props.handleChange(`Playing: ${event}`);
    }
  }

  handleKeyPress(event) {
    console.log('handleKeyPress');
    this.playAudio(event.key);
  }
  render() {
    return (
      <div id="drum">
        <Q_button
          handleKeyPress={this.handleKeyPress}
          playAudio={this.playAudio}
        />
        <W_button
          handleKeyPress={this.handleKeyPress}
          playAudio={this.playAudio}
        />
        <button
          className="drum-pad"
          id="clip_E"
          type="submit"
          onClick={e => this.playAudio('e')}
        >
          e
          <audio className="clip" id="e" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="e"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
        <button
          className="drum-pad"
          id="clip_A"
          type="submit"
          onClick={e => this.playAudio('a')}
        >
          a
          <audio className="clip" id="a" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="a"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
        <button
          className="drum-pad"
          id="clip_S"
          type="submit"
          onClick={e => this.playAudio('s')}
        >
          s
          <audio className="clip" id="s" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="s"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
        <button
          className="drum-pad"
          id="clip_D"
          type="submit"
          onClick={e => this.playAudio('d')}
        >
          d
          <audio className="clip" id="d" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="d"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
        <button
          className="drum-pad"
          id="clip_Z"
          type="submit"
          onClick={e => this.playAudio('z')}
        >
          z
          <audio className="clip" id="z" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="z"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
        <button
          className="drum-pad"
          id="clip_X"
          type="submit"
          onClick={e => this.playAudio('x')}
        >
          x
          <audio className="clip" id="x" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="x"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
        <button
          className="drum-pad"
          id="clip_C"
          type="submit"
          onClick={e => this.playAudio('c')}
        >
          c
          <audio className="clip" id="c" src={soundFile} />
          <React.Fragment>
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue="c"
              onKeyHandle={this.handleKeyPress}
            />
          </React.Fragment>
        </button>
      </div>
    );
  }
}
DrumMachine.propTypes = {};

export default DrumMachine;
