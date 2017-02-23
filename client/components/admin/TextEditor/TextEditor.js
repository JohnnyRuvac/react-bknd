import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import toolbar from './toolbar';
import styles from './styles.sass';


export default class TextEditor extends React.Component {
  state = {
    editor: null,
  };

  render() {
    return (
      <Editor
        editorState={this.state.editor}
        onEditorStateChange={this.onEditorStateChange.bind(this)}
        uploadCallback={this.uploadImageCallBack.bind(this)}
        toolbar={toolbar}
      />
    );
  }

  componentWillReceiveProps(nextProps) {
    const html = nextProps.content;
    const blocksFromHtml = htmlToDraft(html);
    const state = ContentState.createFromBlockArray( blocksFromHtml.contentBlocks );
    this.setState({
      editor: EditorState.createWithContent(state),
    });
  }

  onEditorStateChange(editorState) {
    const html = this.getHtml(editorState);
    this.props.receiver(html);

    this.setState({
      editor: editorState,
    });
  }

  uploadImageCallBack() {
    console.log('uploadImageCallBack');
  }

  getHtml(editorState) {
    const rawContentState = convertToRaw( editorState.getCurrentContent() );
    const html = draftToHtml(rawContentState)
    return html;
  }

}