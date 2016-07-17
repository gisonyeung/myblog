import React from 'react';
import { Router, IndexRoute, Route, Redirect, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
// import Home from './Home';

const MainController = React.createClass({


  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/mylife" component={Home} />
          <Route path="/book" component={Home} />
          <Route path="/tag" component={Home} />
          <Route path="/archive" component={Home} />
          <Route path="/about" component={Home} />
          <Redirect from="/*" to="/" />
        </Route>
	  </Router>
    )
  }

});

export default MainController;