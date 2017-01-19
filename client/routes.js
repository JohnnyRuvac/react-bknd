import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import AuthService from './utils/AuthService';
import Container from './components/Container';
import Home from './components/Home';
import Login from './components/Login';


const auth = new AuthService(
  process.env.AUTH0_CLIENT_ID,
  process.env.AUTH0_DOMAIN
);

// validate authenticatino for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
  if (nextState.location.hash) {
    const result = auth.parseHash(nextState.location.hash);
    replace({ pathname: '/' });
  }
}

const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={parseAuthHash} />
    </Route>
  );
}

export default makeMainRoutes