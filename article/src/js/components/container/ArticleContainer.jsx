import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../presentational/Input.jsx';

export default class ArticleContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      seo_title: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}

// const wrapper = document.getElementById('create-calculator');
// wrapper ? ReactDOM.render(<CalculatorContainer />, wrapper) : false;
