import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import { TextInput, SlugInput } from '../Form';
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
            <FormGroup controlId="content">
              <ControlLabel>Text</ControlLabel>
              <TextEditor
                content={this.state.contentData.content}
                ref="te"
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
