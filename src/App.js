import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';

import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Singup/Signup';
import Logout from './containers/Auth/Logout/Logout';
import FrontPage from './containers/FrontPage/FrontPage';
import PartyEvents from './containers/PartyEvents/PartyEvents';
// import SingleEvent from './containers/PartyEvents/SingleEvent/SingleEvent';
import CreateEvent from './containers/PartyEvents/CreateEvent/CreateEvent';
import AddIngredientsToEvent from './containers/PartyEvents/CreateEvent/AddIngredientsToEvent/AddIngredientsToEvent';
import EventForUser from './containers/PartyEvents/EventForUser/EventForUser';
import EventForCreator from './containers/PartyEvents/EventForCreator/EventForCreator';
// import AddIngredientsToEvent1 from './containers/PartyEvents/CreateEvent/AddIngredientsToEvent.1/AddIngredientsToEvent';

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/events' component={PartyEvents} />
        <Route exact path='/events/create-event' component={CreateEvent} />
        <Route
          exact
          path='/events/create-event/add-ingredients'
          component={AddIngredientsToEvent}
        />
        <Route exact path='/events/eventForUser' component={EventForUser} />
          <Route exact path='/events/eventForCreator' component={EventForCreator} />
        {/* <Route exact path='/events/:eventId' component={SingleEvent} /> */}
        <Route exact path='/' component={FrontPage} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/logout' component={Logout} />
          <Route exact path='/events' component={PartyEvents} />
          <Route exact path='/events/create-event' component={CreateEvent} />
          <Route
            exact
            path='/events/create-event/add-ingredients'
            component={AddIngredientsToEvent}
          />
          <Route exact path='/events/eventForUser' component={EventForUser} />
          <Route exact path='/events/eventForCreator' component={EventForCreator} />
          {/* <Route exact path='/events/:eventId' component={SingleEvent} /> */}
          <Route exact path='/' component={FrontPage} />
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

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => {
      dispatch(actions.authCheckState());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
