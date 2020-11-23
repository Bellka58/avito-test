import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MAIN_PAGE, NEWS_PAGE } from '../constants/paths';
import NewsList from './news-list';
import NewsItem from './news-item';

const App = () => (
  <div>
    <Router>
      <Route exact path={MAIN_PAGE} component={NewsList} />
      <Route path={`${NEWS_PAGE}/:id`} component={NewsItem} />
    </Router>
  </div>
);

export default App;
