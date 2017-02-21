import React from 'react';
import Dropzone from 'dropzone';
import dropzoneCss from 'dropzone/dist/min/dropzone.min.css';
import Helpers from 'Utils/Helpers';
import styles from '../Uploader/Uploader.sass';


export default class Uploader extends React.Component {
  serverUrl = Helpers.getServerUrl();
  state = {
    uploadedFileName: ''
  };

  render() {
    Dropzone.autoDiscover = false;

    return (
      <form action="/file-upload"
        className="dropzone uploader">
      </form>
    );
  }

  componentDidMount() {
    const uploader = new Dropzone('.uploader', {
      url: this.serverUrl + '/upload',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('id_token')
      },
      paramName: 'photo',
      uploadMultiple: false,
      addRemoveLinks: true,
    });

    uploader.on('success', (file, response) => {
      this.setState({
        uploadedFileName: response,
      });
      this.props.onSuccess(response);
    });

    uploader.on('removedfile', (file) => {
      this.props.onRemovedFile( this.state.uploadedFileName );
    });
  }
}