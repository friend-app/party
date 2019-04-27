import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Singup/Signup';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  state = {
    isAuth: false
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    );

    if(this.state.isAuth) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
        </Switch>
      );
    };

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default App;
