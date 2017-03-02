import React from 'react';
import ContentType from '../ContentType/ContentType';
import axios from 'axios';
import Helpers from 'Utils/Helpers';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { TextInput, SlugInput } from '../Form';
import Uploader from '../Uploader/Uploader';
import styles from './ImageTest.sass';


export default class ImageTest extends ContentType {
  state = {
    contentData: {
      title: '',
      slug: '',
      images: [],
    }
  };
  serverUrl = Helpers.getServerUrl();
  

  render() {
    return (
      <Grid className="static-page">
        <Row>
          <Col xs={12}>
            <h3>New Image Test</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <TextInput 
              controlId="title"
              label="Title"
              placeholder="Title"
              value={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
          </Col>
        </Row>
      
        <Row>
          <Col xs={12}>
            <SlugInput 
              controlId="slug"
              label="Slug"
              placeholder="some-name"
              value={this.state.contentData.slug}
              titleValue={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Uploader 
              onSuccess={this.onSuccess.bind(this)}
              onRemovedFile={this.onRemovedFile.bind(this)}
              onReorderImages={this.onReorderImages.bind(this)}
              images={this.state.contentData.images}
            />
          </Col>
        </Row>
        
        <Row>
          <Col xs={12}>
            <Button bsStyle="success"
              bsSize="small" 
              onClick={this.save.bind(this)}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

  onSuccess(file) {
    const images = this.state.contentData.images;
    images.push(file);

    this.updateContentDataState({
      images: images,
    });
  }

  onRemovedFile(file) {
    const url = this.serverUrl + '/upload/delete/' + file;
    axios.delete(url, 
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('id_token')
        },
      })
      .then(response => {
        const images = this.state.contentData.images;
        const index = images.indexOf(response.data);
        images.splice(index, 1);

        this.updateContentDataState({
          images: images,
        });
      })
      .catch(err => {
        console.log('error deleting :/');
        console.log(err);
      });

  }

  onReorderImages(fromIndex, toIndex) {
    const images = this.state.contentData.images;
    const reordered = Helpers.moveItemInArray(images, fromIndex, toIndex);

    this.updateContentDataState({
      images: reordered,
    });
  }

  getValidationState() {
    return null;
  }
}