import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';


export default class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>This is home.</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}