import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';


export default class SortableListItem extends React.Component {
  render() {
    const props = this.props;

    return (
      <li className="list-item"
        data-id={props.index}
      >
        <a href="" className="handle"></a>
        <Link to={props.editUrl} 
          className="title"
        >{props.title}</Link>
        <Button 
          onClick={this.handleRemove.bind(this)}
          className="delete"
          bsStyle="danger"
          bsSize="small" 
        >Delete
        </Button>
      </li>
    );
  }

  handleRemove(e) {
    e.preventDefault();
    this.props.handleRemove(this.props.slug);
  }
}