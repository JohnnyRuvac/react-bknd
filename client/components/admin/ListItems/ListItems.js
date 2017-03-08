import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Helpers from 'Utils/Helpers';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import styles from './ListItems.sass'
import SortableList from '../SortableList/SortableList';


export default class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.serverUrl = Helpers.getServerUrl();
    this.state = {
      items: [],
      slug: (props.route) ? Helpers.slugFromRoute(props.route) : props.slug,
    }
  }
  
  render() {
    const addLink = 
      (this.props.addLink) ? 
        this.props.addLink : 
        ('/admin/' + this.state.slug + '/add');

    return (
      <Grid className="list-items">
        <Row>
          <Col sm={8} smOffset={2} className="head">
            <h3 className="title">{this.props.title || this.props.route.title}</h3>
            <Link to={addLink}>
              <Button className="add" bsStyle="success" bsSize="small">Add</Button>
            </Link>
          </Col>
        </Row>
        
        <Row>
          <Col sm={8} smOffset={2}>
            <SortableList
              items={this.state.items}
              handleRemove={this.deleteItem.bind(this)}
              onReorder={this.onReorder.bind(this)}
              editUrlStart={'/admin/' + this.state.slug + '/edit/'}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
  
  fetchItems(slug) {
    if (!slug) return;

    let url = this.serverUrl + '/api/' + slug;

    // fetch items in this category
    if (this.props.categorySlug) {
      url += '/' + this.props.categorySlug;
    }

    axios
      .get(url)
      .then(res => {
        this.setState({
          items: res.data
        });
      });
  }

  componentDidMount() {
    this.fetchItems(this.state.slug);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.route) {
      const newSlug = Helpers.slugFromRoute(nextProps.route);
      if (newSlug !== nextState.slug) {
        this.fetchItems(newSlug);
        nextState.slug = newSlug;
      }
    }

    // update after received categorySlug in props
    if (nextProps.categorySlug !== this.props.categorySlug) {
      this.fetchItems(this.state.slug);
    }

    // don't list uncategorized items in categories
    if (nextState.slug === 'categories') {
      nextState.items = nextState.items.filter(item => item.slug !== '_uncategorized');
    }
  }

  deleteItem(slug) {
    const deleteUrl = this.serverUrl + '/api/' + this.state.slug + '/' + slug;
    axios
      .delete( deleteUrl, { 
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('id_token') 
        }
      })
      .then(res => {
        const updated = this.state.items.filter(p => p.slug !== slug);
        this.setState({items: updated});
      })
      .catch(err => {
        console.log(this.state.slug + ' delete error: ');
        console.log(err);
      });
  }

  onReorder(fromIndex, toIndex) {
    let items = this.state.items;
    items = Helpers.moveItemInArray(items, fromIndex, toIndex)
    this.setState({
      items: items,
    });

    items.map((item, index) => {
      item.index = index;
      this.saveItem(item);
    });
  }

  saveItem(item) {
    const url = this.serverUrl + '/api/' + this.state.slug + '/' + item.slug;
    const opts = { 
      headers: { 
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    };

    delete item._id;

    axios
      .patch(url, item, opts)
      .catch(err => {
        console.log(item.slug + ' patch error: ');
        console.log(err);
      });
  }

}