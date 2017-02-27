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
    this.me = new MediumEditor(this.refs.ta);
    const html = this.props.content;
    this.me.setContent(html);
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

}