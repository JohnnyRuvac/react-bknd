import React from 'react';
import Header from '../../shared/Header/Header';
import { Link } from 'react-router';


export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header title="React App" linkTo="/" navi=
          {<nav className="col-xs-2 col-sm-9">
            <ul>
              <li><Link to="/p1">p!</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </nav>}
        />
        {this.props.children}
      </div>
    );
  }
}