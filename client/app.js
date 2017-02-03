import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';


const App = () => (
  <Router key={Math.random()} routes={routes} history={browserHistory} />
);

export default App;
