import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { TextInput, SlugInput, TextEditor } from '../Form';


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
            <TextEditor
              label="Content"
              content={this.state.contentData.content}
              receiver={this.updateContentDataState.bind(this)}
              contentKey="content"
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

  getContent(content) {
    this.state.contentData.content = content;
  }

}
