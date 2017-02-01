import React from 'react';
import Header from '../../shared/Header/Header';
import { Link } from 'react-router';


export default class Layout extends React.Component {
  render() {
    const naviItems = [
      { href: '/p1', text: 'p!' },
      { href: '/admin', text: 'Admin' },
    ];

    return (
      <div>
        <Header title="React App" linkTo="/" naviItems={naviItems} />
        {this.props.children}
      </div>
    );
  }
}