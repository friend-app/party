import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Singup/Signup';
import Logout from './containers/Auth/Logout/Logout';
import FrontPage from './containers/FrontPage/FrontPage';
import PartyEvents from './containers/PartyEvents/PartyEvents';
import PartyEvent from './containers/PartyEvents/SingleEvent/SingleEvent';

class App extends Component {
  state = {
    isAuth: false
  };

  render() {
    let routes = (
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/events' component={PartyEvents} />
        <Route exact path='/events/:eventId' component={PartyEvent} />
        <Route exact path='/' component={FrontPage} />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
        </Switch>
      );
    }

    return (
      <div className='App'>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default App;
