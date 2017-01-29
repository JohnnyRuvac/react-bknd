import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import AuthService from './utils/AuthService';
import Container from './components/Container';
import Home from './components/Home';
import { Login, AdminLayout, ListItems, StaticPage, Category, ImageTest } from './components/Admin/AdminComponents';


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
    replace({ pathname: '/admin' });
  }
}

const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} onEnter={requireAuth} />
      <Route path="/login" component={Login} onEnter={parseAuthHash} />
      
      <Route path="/admin" component={AdminLayout} onEnter={requireAuth}>
        
        <Route path="/admin/pages" component={ListItems} title="Pages" />
        <Route path="/admin/pages/add" component={StaticPage} />
        <Route path="/admin/pages/edit/:slug" component={StaticPage} />

        <Route path="/admin/categories" component={ListItems} title="Categories" />
        <Route path="/admin/categories/add" component={Category} />
        <Route path="/admin/categories/edit/:slug" component={Category} />

        <Route path="/admin/image-tests" component={ListItems} title="Image Test" />
        <Route path="/admin/image-tests/add" component={ImageTest} />
        <Route path="/admin/image-tests/edit/:slug" component={ImageTest} />

      </Route>
    </Route>
  );
}

export default makeMainRoutes