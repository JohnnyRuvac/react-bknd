import React from 'react';
import Header from '../../shared/Header/Header';
import { Link } from 'react-router';


export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <Header title="Admin" navi=
          {<nav className="col-xs-2 col-sm-9">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/admin/pages">Pages</Link></li>
              <li><Link to="/admin/categories">Categories</Link></li>
              <li><Link to="/admin/image-tests">Image Tests</Link></li>
            </ul>
          </nav>}
        />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}