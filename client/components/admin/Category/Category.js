import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Link } from 'react-router';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { TextInput, SlugInput } from '../Form';
import ItemsInCategory from './ItemsInCategory';
import styles from './Category.sass';
import AdminHead from '../AdminHead/AdminHead';


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
          title="In this category"
        />
    }

    return (
      <Grid className="admin-item">
        <AdminHead
          title={this.props.route.title}
          onSave={this.save.bind(this)}
          onRemove={this.handleRemove.bind(this)}
          saveText="Save"
          deleteText="Delete"
        />
        
        <Row className="underlined">
          <Col sm={8} smOffset={2}>
            <TextInput 
              controlId="title"
              label="Title"
              placeholder="Title"
              value={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
            
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

        <Row className="underlined in-category">
          {itemsInThisCategory}
        </Row>
      </Grid>
    );
  }

  getValidationState() {
    return null;
  }

  handleRemove() {
    console.log('neni');
  }
}