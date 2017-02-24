import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './SortableList.sass';
import Sortable from 'sortablejs';
import SortableListItem from './SortableListItem';


export default class SortableList extends React.Component {
  render() {
    return (
      <ul 
        className="sortable-list"
        ref="sortableList"
      >
        {this.props.items.map((item, index) =>
          <SortableListItem
            key={index}
            index={index}
            slug={item.slug}
            editUrl={this.props.editUrlStart + item.slug}
            title={item.title}
            handleRemove={this.props.handleRemove.bind(this)}
          />
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