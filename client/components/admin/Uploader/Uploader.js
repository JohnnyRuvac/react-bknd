import React from 'react';
import Dropzone from 'dropzone';
import dropzoneCss from 'dropzone/dist/min/dropzone.min.css';
import Sortable from 'sortablejs';
import axios from 'axios';
import Helpers from 'Utils/Helpers';
import styles from '../Uploader/Uploader.sass';
import { Button } from 'react-bootstrap';


export default class Uploader extends React.Component {
  serverUrl = Helpers.getServerUrl();

  render() {
    Dropzone.autoDiscover = false;

    return (
      <div className="uploader-wrapper">
        <h3 className="images-headline">Images</h3>
        <span className="mobile-upload btn btn-sm btn-success">
          Add
          <form encType="multipart/form-data" ref="mobileUploadForm">
            <input
              type="file" 
              hidden
              name="photo"
              accept="image/*;capture=camera"
              onChange={this.submitMobilePhotos.bind(this)}
            />
          </form>
        </span>
        <ul 
          className="images-list"
          ref="imagesList"
        >
          {this.props.images.map((src, index) =>
            <li className="image-wrap" 
              key={index}
              data-id={index}
            >
              <a href="" className="handle"></a>
              <img src={this.serverUrl + '/uploads/' + src} alt=""/>
              <Button 
                onClick={this.handleRemove.bind(this)}
                data-src={src}
                className="delete"
                bsStyle="danger"
                bsSize="small" 
              >Delete
              </Button>
            </li>
          )}
        </ul>

        <form ref="uploadForm" 
          action="/file-upload"
          className="dropzone desktop-uploader uploader">
        </form>

      </div>
    );
  }

  componentDidMount() {
    // dropzone uploader
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

  componentDidUpdate(prevProps, prevState) {
    // sortable list
    this.makeSortable();
    this.originalOrder = this.sortable.toArray();
  }

  makeSortable() {
    this.sortable = Sortable.create(this.refs.imagesList, {
      handle: '.handle',
      onEnd: (e) => {
        this.sortable.sort( this.originalOrder );
        this.props.onReorderImages(e.oldIndex, e.newIndex);
      }
    });
  }

  handleRemove(e) {
    e.preventDefault();
    const name = e.target.getAttribute('data-src');
    this.props.onRemovedFile(name);
  }

  editImages(e) {
    e.preventDefault();
    this.setState({
      editClass: (this.state.editClass) ? '' : ' editing',
    });
  }

  submitMobilePhotos() {
    const url = this.serverUrl + '/upload';
    const data = new FormData(this.refs.mobileUploadForm);

    axios.post(url, data,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
        },
      }
    )
    .then(response => {
      this.props.onSuccess(response.data);
      console.log('response');
      console.log(response);
    });
  }

}