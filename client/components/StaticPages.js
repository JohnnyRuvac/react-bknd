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
            <li key={p._id}>{p.title}: {p.content}</li>
          )}
        </ul>
      </div>
    );
  }
  
  componentWillMount() {
    axios.get( process.env.SERVER_URL + '/pages' )
      .then(res => {
        this.setState({
          pages: res.data
        });
      })
  }

}