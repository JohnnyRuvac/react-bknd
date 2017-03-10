import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';


export default class Home extends React.Component {
  render() {
    const meta = {
      title: 'BKND',
      description: 'backend for my react apps',
    };

    return (
      <Grid>
        <DocumentMeta {...meta} />
        <Row>
          <Col xs={12}>
            <h2>This is home.</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}