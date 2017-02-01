import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './_header.sass'


export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Grid>
          <Row>
            <h2 className="logo col-xs-12 col-sm-3">
              <Link to={this.props.linkTo}>{this.props.title}</Link>
            </h2>
            <a href="" className="hamburger" onClick={this._toggleMenu.bind(this)}>
              <span className="icon"></span>
            </a>
            <nav className="main-menu col-xs-2 col-sm-9">
              <ul>
                {this.props.naviItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.href} onClick={this._closeMenu}>{item.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="content-cover" ref="contentCover"></div>
          </Row>
        </Grid>
      </header>
    );
  }

  componentDidMount() {
    this.refs.contentCover.addEventListener('touchstart', this._closeMenu.bind(this));
    window.addEventListener('scroll', this._closeMenu.bind(this));
  }

  componentWillUnmount() {
    this.refs.contentCover.removeEventListener('touchstart', this._closeMenu.bind(this));
    window.removeEventListener('scroll', this._closeMenu.bind(this)); 
  }

  _toggleMenu(e) {
    e.preventDefault();
    document.body.classList.toggle('menu-opened');
  }

  _closeMenu(e) {
    document.body.classList.remove('menu-opened'); 
  }

}
