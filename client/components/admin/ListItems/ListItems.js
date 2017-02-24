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
    this.slug = Helpers.slugFromRoute(this.props.route);
    this.serverUrl = Helpers.getServerUrl();
    this.state = {
      items: []
    }
  }
  
  render() {
    return (
      <Grid className="static-page">
        <Row>
          <Col sm={10} smOffset={1} className="head">
            <h3 className="title">{this.props.route.title}</h3>
            <Link to={'/admin/' + this.slug + '/add'}>
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
              editUrlStart={'/admin/' + this.slug + '/edit/'}
            />
          </Col>
        {/* 
          <ul className="items col-sm-8 col-sm-offset-2">
            {this.state.items.map(i => 
              <li key={i._id}>
                <Row>
                  <Link 
                    to={'/admin/' + this.slug + '/edit/' + i.slug}
                    className="page-title col-xs-9"
                  >
                    {i.title}
                  </Link>
                  <Col xs={3}>
                    <Button 
                      onClick={e => this.deleteItem(e, i.slug)}
                      className="delete"
                      bsStyle="warning"
                      bsSize="small" 
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </li>
            )}
          </ul>
        */}
        </Row>
      </Grid>
    );
  }
  
  fetchItems() {
    const url = this.serverUrl + '/api/' + this.slug;

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
    const newSlug = Helpers.slugFromRoute(nextProps.route);
    if (newSlug !== this.slug) {
      this.slug = newSlug;
      this.fetchItems();
    }
  }

  deleteItem(e, slug) {
    e.preventDefault();
    axios.delete( this.serverUrl + '/api/' + this.slug + '/' + slug,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } })
      .then(res => {
        const updated = this.state.items.filter(p => p.slug !== slug);
        this.setState({items: updated});
      })
      .catch(err => {
        console.log(this.slug + ' delete error: ');
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
    const url = this.serverUrl + '/api/' + this.slug + '/' + item.slug;
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