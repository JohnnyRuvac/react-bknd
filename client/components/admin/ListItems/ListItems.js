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
    return (
      <Grid className="static-page">
        <Row>
          <Col sm={10} smOffset={1} className="head">
            <h3 className="title">{this.props.title || this.props.route.title}</h3>
            <Link to={'/admin/' + this.state.slug + '/add'}>
              <Button className="add" bsStyle="success" bsSize="small">Add</Button>
            </Link>
          </Col>
        </Row>
        
        <Row>
          <Col sm={10} smOffset={1}>
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
  
  fetchItems() {
    if (!this.state.slug) return;

    const url = this.serverUrl + '/api/' + this.state.slug;

    axios.get(url)
      .then(res => {
        this.setState({
          items: res.data
        });
      });
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route) {
      const newSlug = Helpers.slugFromRoute(nextProps.route);
      if (newSlug !== this.state.slug) {
        this.fetchItems();
      }
    }
  }

  deleteItem(slug) {
    axios.delete( this.serverUrl + '/api/' + this.state.slug + '/' + slug,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } })
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