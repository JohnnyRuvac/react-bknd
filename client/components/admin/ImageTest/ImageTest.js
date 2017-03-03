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
              images={this.state.contentData.images}
              onChange={this.updateContentDataState.bind(this)}
              deleteUrl={this.serverUrl + '/upload/delete/'}
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

  

  getValidationState() {
    return null;
  }
}