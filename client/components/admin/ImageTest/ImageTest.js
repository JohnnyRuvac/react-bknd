import React from 'react';
import ContentType from '../ContentType/ContentType';
import axios from 'axios';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import styles from './ImageTest.sass';


export default class ImageTest extends ContentType {
  constructor(props) {
    super(props);
    this.state.contentData = {
      title: '',
      slug: '',
      imageUrl: '',
    };
  }

  render() {
    return (
      <Grid className="static-page">
        <Row>
          <Col xs={12}>
            <h3>New Image Test</h3>
          </Col>
        </Row>

        <img src={this.state.contentData.imageUrl} alt=""/>

        <Row>
          <Col xs={12}>
            <FormGroup
              controlId="title"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Title"
                value={this.state.contentData.title}
                onChange={this.handleChange.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
      
        <Row>
          <Col xs={12}>
            <FormGroup
              controlId="slug"
              validationState={this.getValidationState()}
            >
              <ControlLabel>{window.location.origin}/pages/</ControlLabel>
              <FormControl
                type="text"
                placeholder="some-name"
                value={this.state.contentData.slug}
                onChange={this.handleSlugChange.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <form encType="multipart/form-data" onSubmit={this.uploadPhoto.bind(this)}>
              <input type="file" name="photo" accept="image/*" />
              <input type="submit" />
            </form>
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

  uploadPhoto(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = this.serverUrl + '/upload'
    axios.post(url, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('id_token')
        },
      })
      .then(response => {
        this.updateContentDataState({
          imageUrl: '/uploads/' + response.data
        });
      })
      .catch(err => {
        console.log('error :/');
        console.log(err);
      });
  }

  getValidationState() {
    return null;
  }
}