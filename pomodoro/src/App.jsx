import React, { Component } from 'react';
import Timer from './Timer.jsx';

class App extends Component {
  constructor() {
    super();
    this.myInterval,
      (this.sound =
        'http://res.cloudinary.com/chartman4/video/upload/v1499897861/BellSound_csbr1a.mp3'),
      this.audio,
      (this.state = {
        break: 5,
        session: 25,
        minutes: 25,
        seconds: 0,
        timer: '25:00',
        pause: true,
        startCount: false,
        phase: 'Session'
      });
    this.countDown = this.countDown.bind(this);
    this.update = this.update.bind(this);
    this.incDec = this.incDec.bind(this);

    this.reset = this.reset.bind(this);

    this.initializePhase = this.initializePhase.bind(this);

    this.switchPhase = this.switchPhase.bind(this);

    this.createTime = this.createTime.bind(this);
  }

  incDec(event) {
    console.log('incDec');
    if (this.state.pause == true) {
      if (event.target.id == 'break-increment' && this.state.break < 60) {
        this.setState({
          break: this.state.break + 1
        });
        this.initializePhase('break', this.state.break + 1);
      } else if (event.target.id == 'break-decrement' && this.state.break > 1) {
        this.setState({
          break: this.state.break - 1
        });
        this.initializePhase('Break', this.state.break - 1);
      } else if (
        event.target.id == 'session-increment' &&
        this.state.session < 60
      ) {
        this.setState({
          session: this.state.session + 1
        });
        this.initializePhase('Session', this.state.session + 1);
      } else if (
        event.target.id == 'session-decrement' &&
        this.state.session > 1
      ) {
        this.setState({
          session: this.state.session - 1
        });
        this.initializePhase('Session', this.state.session - 1);
      } else {
        // console.log('there was an error in incDec');
      }
    }
  }

  //pause play
  countDown() {
    if (this.state.startCount == false) {
      this.myInterval = setInterval(this.update, 1000);
      this.setState({
        startCount: true
      });
    }
    if (this.state.pause == true) {
      this.setState({
        pause: false
      });
    } else {
      this.setState({
        pause: true
      });
    }
  }

  createTime(minutes, seconds) {
    // let minutes = this.state.minutes;
    if (minutes < 10) minutes = '0' + minutes;
    // let seconds = this.state.seconds;
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes}:${seconds}`;
  }

  update() {
    console.log('update: seconds: ' + this.state.seconds);
    if (this.state.pause == false) {
      if (this.state.seconds == 0) {
        this.state.minutes > 0
          ? this.setState({
              seconds: 59,
              minutes: this.state.minutes - 1,
              timer: this.createTime(this.state.minutes - 1, 59)
            })
          : this.switchPhase();
      } else {
        this.setState({
          seconds: this.state.seconds - 1,
          timer: this.createTime(this.state.minutes, this.state.seconds - 1)
        });
      }
    } else {
      console.log('countdown paused ' + this.state.seconds);
    }
  }
  reset() {
    console.log(
      'reset pressed. Minutes: ' +
        this.state.minutes +
        ' Seconds: ' +
        this.state.seconds
    );
    document.getElementById('beep').pause();
    document.getElementById('beep').load();
    this.setState({
      phase: 'Session',
      break: 5,
      session: 25,
      minutes: 25,
      seconds: 0,
      timer: '25:00',
      pause: true,
      startCount: false
    });
    window.clearInterval(this.myInterval);
  }

  initializePhase(phase, minutes) {
    console.log('initializePhase');
    if (minutes < 10) minutes = '0' + minutes;
    if (phase == this.state.phase) {
      this.setState({
        minutes: minutes,
        seconds: 0,
        timer: minutes + ':00'
      });
    }
  }

  switchPhase() {
    // add sound
    document.getElementById('beep').play();
    if (this.state.phase == 'Session') {
      this.setState({
        seconds: 0,
        minutes: this.state.break,
        timer: this.createTime(this.state.break, 0),
        phase: 'Break'
      });
    } else {
      this.setState({
        seconds: 0,
        minutes: this.state.session,
        timer: this.createTime(this.state.session, 0),
        phase: 'Session'
      });
    }
  }
  render() {
    return (
      <div>
        <h1>Pomodoro clock</h1>
        <div>
          <h2>Break Length</h2>
          <label id="break-label">Break Length</label>
          <button id="break-increment" onClick={this.incDec}>
            Inc
          </button>
          <span id="break-length">{this.state.break}</span>
          <button id="break-decrement" onClick={this.incDec}>
            Dec
          </button>
        </div>
        <div>
          <h2>Session Length</h2>
          <label id="session-label">Session Length</label>
          <button id="session-increment" onClick={this.incDec}>
            Inc
          </button>
          <span id="session-length">{`${this.state.session}`}</span>
          <button id="session-decrement" onClick={this.incDec}>
            Dec
          </button>
          <Timer
            phase={this.state.phase}
            timer={this.state.timer}
            countDown={this.countDown}
            reset={this.reset}
          />
          <audio id="beep" src={this.sound} />
          <p>Designed and coded by Vigeneareay Phriang</p>
        </div>
      </div>
    );
  }
}
export default App;
