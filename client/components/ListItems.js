import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Helpers from '../utils/Helpers';


export default class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.slug = Helpers.slugFromRoute(this.props.route);
    this.state = {
      items: []
    }
  }
  
  render() {
    return (
      <div>
        <h2>{this.props.route.title}</h2>
        <Link to={'/admin/' + this.slug + '/add'}>Add</Link>
        <ul>
          {this.state.items.map(i => 
            <li key={i._id}>
              <Link to={'/admin/' + this.slug + '/edit/' + i.slug}>{i.title}</Link>
              <a href="" onClick={e => this.deleteItem(e, i.slug)}>Delete</a>
            </li>
          )}
        </ul>
      </div>
    );
  }
  
  fetchItems() {
    const url = process.env.SERVER_URL + '/' + this.slug;

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
    axios.delete( process.env.SERVER_URL + '/' + this.slug + '/delete/' + slug,
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