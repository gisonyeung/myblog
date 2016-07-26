import React from 'react';
import { Router, IndexRoute, Route, Redirect, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Mylife from './Mylife';
import Book from './Book';
import Archives from './Archives';
import Article from './Article';
import WalkBlogDetail from './WalkBlogDetail';



const addPage = (nextStage, replace) => {
  // 无query则附加
  if ( !nextStage.location.query.page ) {
    replace('/?page=1');
  }
}

const addPage_change = (prevStage, nextStage, replace) => {
  // 无query则附加
  if ( !nextStage.location.query.page ) {
    replace('/?page=1');
  }
}


const MainController = React.createClass({

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} onEnter={addPage} onChange={addPage_change}/>
          <Route path="/article/:articleId" component={Article} />
          <Route path="/mylife" component={Mylife} />
          <Route path="/mylife/:postId" component={WalkBlogDetail} />
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