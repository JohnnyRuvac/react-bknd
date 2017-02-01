import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Row, Col, Button } from 'react-bootstrap';


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
      <Grid>
        <Row>
          <h3 className="col-xs-12">New category</h3>
        </Row>
        <Row>
          <input type="text" 
            className="col-xs-12"
            name="title"
            placeholder="Title"
            value={this.state.contentData.title}
            onChange={this.handleChange.bind(this)}
          />
        </Row>
        <Row>
          <input type="text"
            className="col-xs-12"
            name="slug"
            placeholder="slug"
            value={this.state.contentData.slug}
            onChange={this.handleSlugChange.bind(this)}
          />
        </Row>
        <Row>
          <Button onClick={this.save.bind(this)}
            bsStyle="success" 
            bsSize="small" 
            type="submit">
            Save
          </Button>
        </Row>
      </Grid>
    );
  }
}