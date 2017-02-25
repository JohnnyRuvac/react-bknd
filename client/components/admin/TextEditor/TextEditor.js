import React from 'react';
import styles from './styles.sass';
import axios from 'axios';
import Helpers from 'Utils/Helpers';
import MediumEditor from 'medium-editor';
import mestyles from 'medium-editor/dist/css/medium-editor.css';


export default class TextEditor extends React.Component {
  state = {
    editor: null,
  };

  render() {
    return (
      <textarea ref="ta" name="" id="" cols="30" rows="10">
      </textarea>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.me = new MediumEditor(this.refs.ta)
    this.me.setContent('<p class="classy"><strong>Some Custom HTML</strong></p>');
  }

  // componentWillReceiveProps(nextProps) {
  //   const html = nextProps.content;
  //   const blocksFromHtml = htmlToDraft(html);
  //   const state = ContentState.createFromBlockArray( blocksFromHtml.contentBlocks );
  //   this.setState({
  //     editor: EditorState.createWithContent(state),
  //   });
  // }

  // onEditorStateChange(editorState) {
  //   const html = this.getHtml(editorState);
  //   this.props.receiver(html);

  //   this.setState({
  //     editor: editorState,
  //   });
  // }

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
    return this.me.getContent()
  }

}