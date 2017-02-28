import React from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';


export default class FilteredCategoryItem extends React.Component {
  render() {
    return (
      <Row className="list-item">
        <Col xs={6} className="item-cell">
          <Link to={'/admin/items/edit/' + this.props.slug}>{this.props.title}</Link>
        </Col>
        <Col xs={6} className="link-cell">
          {this.props.categorySlug.map( (item, index) =>
            <Link
              className="category-link" 
              key={index} 
              to={'/admin/categories/edit/' + item}
            >{item}
            </Link>
          )}
        </Col>
      </Row>
    );
  }
}