import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


export default class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>Admin home.</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}
