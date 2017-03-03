import React from 'react';
import styles from './styles.sass';
import axios from 'axios';
import Helpers from 'Utils/Helpers';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import MediumEditor from 'medium-editor';
import mestyles from 'medium-editor/dist/css/medium-editor.css';
import metheme from 'medium-editor/dist/css/themes/default.css';


export default class TextEditor extends React.Component {
  state = {
    editor: null,
  };

  render() {
    return (
      <FormGroup controlId="content">
        <ControlLabel>{this.props.label}</ControlLabel>
        <textarea ref="ta"></textarea>
      </FormGroup>
    );
  }

  componentDidMount() {
    this.me = new MediumEditor(this.refs.ta, {
      imageDragging: false,
    });

    // save content on every content change
    this.me.subscribe('blur', () => {
      const html = this.me.getContent();
      const obj = Helpers.getChangedData( this.props.controlId, html );
      this.props.onChange(obj);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const html = this.props.content;
    this.me.setContent(html);
  }

  componentWillUnmount() {
    this.me.destroy();
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