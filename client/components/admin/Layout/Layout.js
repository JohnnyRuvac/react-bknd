import React from 'react';
import Header from '../../shared/Header/Header';
import { Link } from 'react-router';


export default class Admin extends React.Component {
  render() {
    const naviItems = [
      { href: '/home', text: 'Home' },
      { href: '/admin/pages', text: 'Pages' },
      { href: '/admin/categories', text: 'Categories' },
      { href: '/admin/image-tests', text: 'Image Tests' },
    ];

    return (
      <div>
        <Header title="Admin" naviItems={naviItems} />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}