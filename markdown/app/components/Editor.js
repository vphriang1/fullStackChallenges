import React, { Component } from 'react';
import Preview from './Preview';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: this.props.markup
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      editor: event.target.value
    });
  }
  render() {
    return (
      <div>
        <textarea
          id="editor"
          value={this.state.editor}
          onChange={this.handleChange}
        />
        <Preview preview={this.state.editor} />
      </div>
    );
  }
}
export default Editor;
