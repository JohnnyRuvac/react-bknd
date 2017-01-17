import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import AuthService from '../utils/AuthService';


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
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" placeholder="email" ref="email" />
          <input type="password" ref="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}