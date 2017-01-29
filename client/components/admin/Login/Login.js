import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import AuthService from 'Utils/AuthService';
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap';
import bootstrap from 'Styles/_custom_bootstrap.scss';
import styles from './Login.sass';


export default class Login extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  };

  getAuthParams() {
    return {
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      username: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // on form submit sends the credentials to auth0 api
    this.props.auth.login(this.getAuthParams(), err => {
      if (err) console.error('something went wrong during login: err.message');
    });
  }

  render() {
    const { auth } = this.props;

    return (
      <Grid>
        <Row>
          <Col xs={8} xsOffset={2} sm={4} smOffset={4} className="login-page">
            <div className="login-window">
              <h4>Login</h4>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <FormControl 
                  type="text"
                  placeholder="email"
                  ref="email"
                />
                <FormControl 
                  type="password"
                  placeholder="password"
                  ref="password"
                />
                <Button bsStyle="success" bsSize="small" type="submit">
                  Log in
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}