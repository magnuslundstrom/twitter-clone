import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles/app.scss';
import Index from './pages/Index';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Status from './pages/Status';
import Followers from './pages/Followers';
import Notifications from './pages/Notifications';
import Auth from './components/global/Auth';

const App = ({ authorized }) => {
  const openRoutes = () => (
    <Switch>
      <Route path="/" exact component={Index}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

  const closedRoutes = () => {
    return (
      <Switch>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/profile/:userId" exact component={Profile}></Route>
        <Route path="/messages" exact component={Messages} />
        <Route path="/messages/:conversationId" exact component={Messages} />
        <Route path="/status/:userId/:tweetId" exact component={Status} />
        <Route path="/:userId/:followRelation(followers|following)" exact component={Followers} />
        <Route path="/notifications" exact component={Notifications} />
        <Redirect to="/home"></Redirect>
      </Switch>
    );
  };

  return (
    <div>
      <Auth>
        <BrowserRouter>{authorized ? closedRoutes() : openRoutes()}</BrowserRouter>
      </Auth>
    </div>
  );
};

const mapStateToProps = ({ auth: { authorized } }) => ({
  authorized,
});

export default connect(mapStateToProps)(App);
