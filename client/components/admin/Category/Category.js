import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Link } from 'react-router';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { TextInput, SlugInput } from '../Form';
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