import React, { Component } from 'react';
import marked from 'marked';
marked.setOptions({
  breaks: true
});

class Preview extends Component {
  constructor(props) {
    super(props);
    this.getRawMarkup = this.getRawMarkup.bind(this);
  }
  getRawMarkup() {
    console.log('entered getRM');
    var rawMarkup = marked(this.props.preview, { sanitize: false });
    return { __html: rawMarkup };
  }
  render() {
    return <div id="preview" dangerouslySetInnerHTML={this.getRawMarkup()} />;
  }
}
export default Preview;
