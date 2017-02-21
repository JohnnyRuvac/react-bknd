import React from 'react';
import Dropzone from 'dropzone';
import dropzoneCss from 'dropzone/dist/min/dropzone.min.css';
import Helpers from 'Utils/Helpers';
import styles from '../Uploader/Uploader.sass';


export default class Uploader extends React.Component {
  serverUrl = Helpers.getServerUrl();

  render() {
    Dropzone.autoDiscover = false;

    return (
      <div className="uploaderWrapper">
        
        {this.props.images.map((src, index) =>
          <div className="image-wrap" key={index}>
            <a href="" 
              className="remove"
              data-src={src}
              onClick={this.handleRemove.bind(this)}
            >Remove</a>
            <img src={this.serverUrl + '/uploads/' + src} alt=""/>
          </div>
        )}

        <form ref="uploadForm" action="/file-upload"
          className="dropzone uploader">
        </form>

      </div>
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
      this.props.onSuccess(response);
    });

    uploader.on('queuecomplete', () => {
      const form = this.refs.uploadForm;
      form.classList.remove('dz-started');
    });
  }

  handleRemove(e) {
    e.preventDefault();
    const name = e.target.getAttribute('data-src');
    this.props.onRemovedFile(name);
  }

}