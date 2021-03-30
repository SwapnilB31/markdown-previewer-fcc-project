import React, {useState} from 'react';
import './App.css';
import marked from 'marked'
import {FaWindowMaximize, FaWindowMinimize} from 'react-icons/fa'

const init_markdown =
`
# MarkDown Previewer
## Built with React Functional Components

It can parse links like these :- [React Docs](https://reactjs.org/docs/getting-started.html) and [Maked Docs](https://marked.js.org/)

You can write inline code with \`function(){}\` and \`class\`.

or a code block

\`\`\`
class MarkedDownPreviewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<p>Write your own markdown</p>)
  }
}
\`\`\` 

You can write lists
* with bullets
  * and indentation
    * and even more indentation

1. Or numbered lists with
2. Two
3. Three
4. or four items

You can quote people like Uncle Ben

> With great power comes great responsibilty.

or **embhasize with bolded text**

And even express yourself with an image ![Uncle Ben](https://static.wikia.nocookie.net/spiderman-films/images/f/fe/Uncle_Ben.jpg/revision/latest/scale-to-width-down/260?cb=20121221101204)
`;

marked.setOptions({
  gfm : true,
  breaks: true,
})

const renderer = {
  link(href, title, text) {
    return `
      <a href='${href}' target='_blank' title='${title}'>${text}</a>
    `
  }
}

marked.use({renderer})


function App() {

  const [markdown,setMarkedDown] =  useState(init_markdown)
  const [editorFull,setEditorFull] = useState(false)
  const [previewFull,setPreviewFull] = useState(false)
  //const [editorSelectionStart,setSelectionStart] = useState(0)
  //const editorRef = useRef(null)


  /**
   * 
   * @param {String} markdownVal 
   * @returns 
   */
  const getMarkdown = (markdownVal) => {
    
    return {
      __html : marked(markdownVal)
    }
  }

  return (
      <div className="container">
        <div className={"disp-container " + (editorFull && !previewFull ? 'disp-fullscreen ' : '') + (previewFull && !editorFull ? 'disp-hidden ' : '')}>
          <div className="menu-bar">
            <div><strong>Editor</strong></div>
            <div className="maximize">
                {editorFull && <FaWindowMinimize title="Minimize Window" onClick={() => setEditorFull(false)}/>}
                {!editorFull && <FaWindowMaximize title="Maximize Window" onClick={() => setEditorFull(true)}/>}
            </div>
          </div>
          <textarea 
            id="editor"
            value={markdown}
            onChange={(e) => {
              setMarkedDown(e.target.value)
            }}            
          ></textarea>
        </div>
        
        <div className={"disp-container " + (editorFull && !previewFull ? 'disp-hidden ' : '') + (previewFull && !editorFull ? 'disp-fullscreen ' : '')}>
          <div className="menu-bar">
            <div><strong>Preview</strong></div>
            <div className="maximize">
              {previewFull && <FaWindowMinimize title="Minimize Window" onClick={() => setPreviewFull(false)}/>}
              {!previewFull && <FaWindowMaximize title="Maximize Window" onClick={() => setPreviewFull(true)}/>}
            </div>
          </div>
          <div id="preview" dangerouslySetInnerHTML={getMarkdown(markdown)}></div>
        </div>

      </div>
  );
}

export default App;
