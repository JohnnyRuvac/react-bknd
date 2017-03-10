import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';


export default class AdminHead extends React.Component {
  render() {
    return (
      <Row className="underlined">
        <Col sm={8} smOffset={2}>

          <Row>
            <Col xs={6}>
              <h3>{this.props.title}</h3>
            </Col>

            <Col xs={6} className="clearfix">
              <Button bsStyle="success"
                bsSize="small" 
                onClick={this.props.onSave.bind(this)}
              >{this.props.saveText}
              </Button>

              <Button 
                onClick={this.props.onRemove.bind(this)}
                className="delete"
                bsStyle="link"
                bsSize="small" 
              >{this.props.deleteText}
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
    );
  }
}