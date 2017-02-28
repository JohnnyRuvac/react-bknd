import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Link } from 'react-router';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import ItemsInCategory from './ItemsInCategory';
import styles from './Category.sass';


export default class Category extends ContentType {
  constructor(props) {
    super(props);
    this.state.contentData = {
      title: '',
      slug: '',
    };
  }

  render() {
    let itemsInThisCategory = null;

    if (this.isEditing) {
      itemsInThisCategory = 
        <ItemsInCategory
          slug="items"
          categorySlug={this.props.params.slug}
          addLink={'/admin/items/' + this.state.contentData.slug + '/add'}
          title="Items in this category"
        />
    }

    return (
      <Grid>
        <Row className="category-head">
          <h2 className="col-xs-9">{this.props.route.title}</h2>
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
            {itemsInThisCategory}
          </Col>
        </Row>
      </Grid>
    );
  }

  getValidationState() {
    return null;
  }
}