import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './SortableList.sass';
import Sortable from 'sortablejs';


export default class SortableList extends React.Component {
  render() {
    return (
      <ul 
        className="sortable-list"
        ref="sortableList"
      >
        {this.props.items.map((item, index) =>
          <li className="list-item"
            key={index}
            data-id={index}
          >
            <a href="" className="handle"></a>
            <Link to={this.props.editUrlStart + item.slug} 
              className="title"
            >{item.title}</Link>
            <Button 
              onClick={this.props.handleRemove.bind(this)}
              className="delete"
              bsStyle="danger"
              bsSize="small" 
            >Delete
            </Button>
          </li>
        )}
      </ul>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // sortable list
    this.makeSortable();
    this.originalOrder = this.sortable.toArray();
  }

  makeSortable() {
    this.sortable = Sortable.create(this.refs.sortableList, {
      handle: '.handle',
      onEnd: (e) => {
        this.sortable.sort( this.originalOrder );
        this.props.onReorder(e.oldIndex, e.newIndex);
      }
    });
  }
}