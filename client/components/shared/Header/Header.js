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
            {this.props.navi}
            <div className="content-cover" ref="contentCover"></div>
          </Row>
        </Grid>
      </header>
    );
  }

  componentDidMount() {
    this.refs.contentCover.addEventListener('touchstart', this._toggleMenu.bind(this));
    // window.onscroll = () => {

    // }
  }

  _toggleMenu(e) {
    e.preventDefault();
    document.body.classList.toggle('menu-opened');
  }

}
