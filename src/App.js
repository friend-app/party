import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Singup/Signup';
import Logout from './containers/Auth/Logout/Logout';
import FrontPage from './containers/FrontPage/FrontPage';
import PartyEvents from './containers/PartyEvents/PartyEvents';
import SingleEvent from './containers/PartyEvents/SingleEvent/SingleEvent';
import CreateEvent from './containers/PartyEvents/CreateEvent/CreateEvent';
import AddIngredientsToEvent from './containers/PartyEvents/CreateEvent/AddIngredientsToEvent/AddIngredientsToEvent';
// import AddIngredientsToEvent1 from './containers/PartyEvents/CreateEvent/AddIngredientsToEvent.1/AddIngredientsToEvent';

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
        <Route exact path='/events/create-event' component={CreateEvent} />
        <Route
          exact
          path='/events/create-event/add-ingredients'
          component={AddIngredientsToEvent}
        />
        {/* <Route
          exact
          path='/events/create-event/add-ingredients1'
          component={AddIngredientsToEvent1}
        /> */}
        <Route exact path='/events/:eventId' component={SingleEvent} />
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
