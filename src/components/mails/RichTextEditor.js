import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = (props) => {
  
    return (
      <ReactQuill
        value={props.value}
        onChange={props.onChange}
        placeholder="Write something..."
      />
    );
  };
  
  export default RichTextEditor;