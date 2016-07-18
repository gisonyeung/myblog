import React from 'react';
import { Router, IndexRoute, Route, Redirect, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Mylife from './Mylife';
import Book from './Book';
import Archives from './Archives';



const MainController = React.createClass({

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/mylife" component={Mylife} />
          <Route path="/book" component={Book} />
          <Route path="/archives" component={Archives} />
          <Route path="/board" component={Home} />
          <Route path="/about" component={Home} />
          <Redirect from="/*" to="/" />
        </Route>
	  </Router>
    )
  }

});

export default MainController;