import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';


export default class StaticPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    }
  }
  
  render() {
    return (
      <div>
        <h2>Static pages</h2>
        <Link to="/admin/pages/add">Add</Link>
        <ul>
          {this.state.pages.map(p => 
            <li key={p._id}>
              <Link to={'/admin/pages/edit/' + p.slug}>{p.title}: {p.content}</Link>
              <a href="" onClick={e => this.deletePage(e, p.slug)}>Delete</a>
            </li>
          )}
        </ul>
      </div>
    );
  }

  deletePage(e, slug) {
    e.preventDefault();
    axios.delete( process.env.SERVER_URL + '/pages/delete/' + slug,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } })
      .then(res => {
        const updated = this.state.pages.filter(p => p.slug !== slug);
        this.setState({pages: updated});
      })
      .catch(err => {
        console.log('page delete error: ');
        console.log(err);
      });
  }
  
  componentWillMount() {
    axios.get( process.env.SERVER_URL + '/pages' )
      .then(res => {
        this.setState({
          pages: res.data
        });
      });
  }

}