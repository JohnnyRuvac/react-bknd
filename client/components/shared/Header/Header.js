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
            <h2 className="col-xs-10 col-sm-3">
              <Link to={this.props.linkTo}>{this.props.title}</Link>
            </h2>
            {this.props.navi}
          </Row>
        </Grid>
      </header>
    );
  }
}
