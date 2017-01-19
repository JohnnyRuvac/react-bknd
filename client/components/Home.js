import React from 'react';
import { Link } from 'react-router';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>This is home.</h2>
        <Link to="/admin">Admin</Link>
      </div>
    );
  }
}