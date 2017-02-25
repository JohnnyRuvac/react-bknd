import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import AuthService from './utils/AuthService';
import Container from './components/Container';
import { Home, Layout } from './components/public/PublicComponents';
import { Login, AdminLayout, Home as AdminHome, ListItems, StaticPage, Category, ImageTest, Item } from './components/admin/AdminComponents';


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
      <Route path="/admin/pages/add" component={StaticPage} title="New page" />
      <Route path="/admin/pages/edit/:slug" component={StaticPage} title="Edit page" />

      <Route path="/admin/categories" component={ListItems} title="Categories" />
      <Route path="/admin/categories/add" component={Category} title="New category" />
      <Route path="/admin/categories/edit/:slug" component={Category} title="Edit category" />
      
      <Route path="/admin/items" component={ListItems} title="Category Items" />
      <Route path="/admin/items/:categorySlug/add" component={Item} />
      <Route path="/admin/items/edit/:slug" component={Item} />

      <Route path="/admin/image-tests" component={ListItems} title="Image tests" />
      <Route path="/admin/image-tests/add" component={ImageTest} title="New Image test" />
      <Route path="/admin/image-tests/edit/:slug" component={ImageTest} title="Edit image test"/>
    </Route>
  </Route>
);

export default makeMainRoutes