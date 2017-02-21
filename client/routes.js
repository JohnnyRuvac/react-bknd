import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import AuthService from './utils/AuthService';
import Container from './components/Container';
import { Home, Layout } from './components/public/PublicComponents';
import { Login, AdminLayout, Home as AdminHome, ListItems, StaticPage, Category, ImageTest } from './components/admin/AdminComponents';


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

const makeMainRoutes = (
  <Route component={Container} auth={auth}>
    <Route path="/login" component={Login} onEnter={parseAuthHash} />

    <Route component={Layout}>
      <Route path="/" component={Home} />
    </Route>
      
    <Route component={AdminLayout} onEnter={requireAuth}>
      <Route path="/admin" component={AdminHome} />
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

export default makeMainRoutes