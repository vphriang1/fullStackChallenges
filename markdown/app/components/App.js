import React, { Component } from 'react';
import Preview from './Preview';
import Editor from './Editor';

class App extends Component {
  render() {
    const markup = `# Welcome to my React Markdown Previewer!
    ## This is a sub-heading...
    <em>inline-code using em test</em>
    
    **[bold-link test](https://www.freecodecamp.com)**
    
    \`back tick code-block\`
    
    \`\`\`
    // multi-line code block
    \`\`\`
    1. numbered-listOne
    1. numbered-listTwo
    * numbered-listThree
    - numbered-listFour
    > This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can put Markdown into a blockquote.
    
    ![React Logo w/ Text](https://goo.gl/Umyytc)`;
    return (
      <div>
        <Editor markup={markup} />
      </div>
    );
  }
}

export default App;
