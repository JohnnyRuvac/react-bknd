import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Helpers from 'Utils/Helpers';
import { Grid, Row, Col } from 'react-bootstrap';


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
      <Grid>
        <Row>
          <h2 className="col-xs-10">{this.props.route.title}</h2>
          <Col xs={2}>
            <Link to={'/admin/' + this.slug + '/add'}>Add</Link>
          </Col>
        </Row>
        <Row>
          <ul className="col-sm-8 col-sm-offset-2">
            {this.state.items.map(i => 
              <li key={i._id}>
                <Link to={'/admin/' + this.slug + '/edit/' + i.slug}>{i.title}</Link>
                <a href="" onClick={e => this.deleteItem(e, i.slug)}>Delete</a>
              </li>
            )}
          </ul>
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

}