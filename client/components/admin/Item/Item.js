import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import TextEditor from '../TextEditor/TextEditor';


export default class StaticPage extends ContentType {
  state = {
    contentData: {
      title: '',
      slug: '',
      content: ''
    },
  };
  
  render() {
    return (
      <Grid className="static-page">
        <Row>
          <Col xs={12}>
            <h3>{this.props.route.title}</h3>
          </Col>
        </Row>

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
            <FormGroup controlId="content">
              <ControlLabel>Text</ControlLabel>
              <TextEditor
                content={this.state.contentData.content}
                receiver={this.getContent.bind(this)}
              />
            </FormGroup>
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

  getContent(content) {
    this.state.contentData.content = content;
  }

}
