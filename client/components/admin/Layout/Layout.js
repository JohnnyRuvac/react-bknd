import React from 'react';
import Header from '../../shared/Header/Header';
import { Link } from 'react-router';


export default class Admin extends React.Component {
  render() {
    const naviItems = [
      { href: '/', text: 'Home' },
      { href: '/admin/pages', text: 'Pages' },
      { href: '/admin/categories', text: 'Categories' },
      { href: '/admin/items', text: 'Category Items' },
      { href: '/admin/image-tests', text: 'Image Tests' },
    ];

    return (
      <div>
        <Header title="Admin" linkTo="/admin" naviItems={naviItems} />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}