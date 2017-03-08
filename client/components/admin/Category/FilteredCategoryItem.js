import React from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';


export default class FilteredCategoryItem extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <p>{this.props.index}</p>
        </td>
        
        <td>
          <Link to={'/admin/items/edit/' + this.props.slug}>{this.props.title}</Link>
        </td>
        
        <td>
          {this.props.categorySlug.map( (item, index) => {
            
            if (item !== '_uncategorized') {
              
              return <Link
                className="category-link" 
                key={index} 
                to={'/admin/categories/edit/' + item}
              >{item}
              </Link>

            } else {
              return <p className="category-link" key={index}>{item}</p>
            }

          })}
        </td>
      </tr>
    );
  }
}