import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Link } from 'react-router';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import ListItems from '../ListItems/ListItems';


export default class Category extends ContentType {
  constructor(props) {
    super(props);
    this.state.contentData = {
      title: '',
      slug: '',
    };
  }

  render() {
    return (
      <Grid className="static-page">
        <Row>
          <h2 className="col-xs-9">New category</h2>
          <Col xs={3}>
            <Button bsStyle="success" 
              bsSize="small" 
              type="submit"
              onClick={this.save.bind(this)}
            >
              Save
            </Button>
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
              <ControlLabel>{window.location.origin}/{this.state.contentData.slug}/</ControlLabel>
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
            <ListItems
              slug="items"
              title="Items in this category"
            />
          </Col>
        </Row>
      </Grid>
    );
  }

  getValidationState() {
    return null;
  }
}