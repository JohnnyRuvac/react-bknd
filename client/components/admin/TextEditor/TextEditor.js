import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import styles from './styles.sass';
import axios from 'axios';
import Helpers from 'Utils/Helpers';


export default class TextEditor extends React.Component {
  state = {
    editor: null,
  };

  render() {
    const toolbar = {
      options: ['inline', 'blockType', 'list', 'link', 'embedded', 'emoji', 'image', 'history'],
      image: {
        uploadCallback: this.uploadImageCallBack,
        alignmentEnabled: false
      },
    };

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

  uploadImageCallBack(file) {
    const form = new FormData();
    form.append('photo', file);
    const url = Helpers.getServerUrl() + '/upload';

    return axios.post(url, form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
        },
      }
    )
    .then(response => {
      return {
        data: {
          link: '/uploads/' + response.data
        }
      }
    });
  }

  getHtml(editorState) {
    const rawContentState = convertToRaw( editorState.getCurrentContent() );
    const html = draftToHtml(rawContentState)
    return html;
  }

}