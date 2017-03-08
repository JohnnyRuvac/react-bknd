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
  state = {
    draggedover: false,
    dropZoneHovered: false,
  };

  render() {
    Dropzone.autoDiscover = false;
    let urlStart = this.serverUrl + '/uploads/';
    if (this.props.folder) {
      urlStart += this.props.folder + '/';
    }

    const containerClasses = (this.state.draggedover || this.props.images.length === 0) ?
      'uploader-wrapper draggedover' : 'uploader-wrapper';

    return (
      <div className={containerClasses}>
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
              <img src={urlStart + src} alt=""/>
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
      url: this.serverUrl + '/upload/' + this.props.folder,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('id_token')
      },
      paramName: 'photo',
      uploadMultiple: false,
      addRemoveLinks: true,
    });

    uploader.on('success', (file, response) => {
      this.onSuccess(response);
    });

    uploader.on('queuecomplete', () => {
      const form = this.refs.uploadForm;
      form.classList.remove('dz-started');
      this.setState({'draggedover': false})
    });

    uploader.on('dragenter', () => {
      this.setState({
        dropZoneHovered: true,
      });
    });

    uploader.on('dragleave', () => {
      this.setState({
        dropZoneHovered: false,
      });
    });

    document.body.addEventListener('dragover', (e) => {
      const isImageReordering = e.target.classList.contains('handle') || e.target.classList.contains('image-wrap');

      if (!this.state.draggedover && !isImageReordering) {
        this.setState({'draggedover': true})
      }
    });

    document.body.addEventListener('dragleave', (e) => {
      const isImageReordering = e.target.classList.contains('handle') || e.target.classList.contains('image-wrap');

      if (!this.state.dropZoneHovered && !isImageReordering) {
        this.setState({'draggedover': false})
      }
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
        const reordered = Helpers.moveItemInArray(this.props.images, e.oldIndex, e.newIndex);
        this.props.onChange({
          images: reordered,
        });
      }
    });
  }

  onSuccess(img) {
    const images = this.props.images;
    images.push(img);

    this.props.onChange({
      images: images,
    });
  }

  handleRemove(e) {
    e.preventDefault();
    const fileName = e.target.getAttribute('data-src');

    const url = this.props.deleteUrl + this.props.folder + '/' + fileName;
    axios.delete(url, 
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('id_token')
        },
      })
      .then(response => {
        const images = this.props.images;
        const index = images.indexOf(response.data);
        images.splice(index, 1);

        this.props.onChange({
          images: images,
        });
      })
      .catch(err => {
        console.log('error deleting');
        console.log(err);
      });

  }

  editImages(e) {
    e.preventDefault();
    this.setState({
      editClass: (this.state.editClass) ? '' : ' editing',
    });
  }

  submitMobilePhotos() {
    const url = this.serverUrl + '/upload/' + this.props.folder;
    const data = new FormData(this.refs.mobileUploadForm);

    axios.post(url, data,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
        },
      }
    )
    .then(response => {
      this.onSuccess(response.data);
      console.log('response');
      console.log(response);
    });
  }

}