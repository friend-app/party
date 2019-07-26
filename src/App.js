import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";

import Login from "./containers/Auth/Login/Login";
import Signup from "./containers/Auth/Singup/Signup";
import Logout from "./containers/Auth/Logout/Logout";
import FrontPage from "./containers/FrontPage/FrontPage";
import PartyEvents from "./containers/PartyEvents/PartyEvents";
import CreateEvent from "./containers/PartyEvents/CreateEvent/CreateEvent";
import AddIngredientsToEvent from "./containers/PartyEvents/CreateEvent/AddIngredientsToEvent/AddIngredientsToEvent";
import EventForUser from "./containers/PartyEvents/EventForUser/EventForUser";
import EventForCreator from "./containers/PartyEvents/EventForCreator/EventForCreator";
import UserChoicesCards from "./containers/PartyEvents/EventForUser/UserChoicesCards/UserChoicesCards";
import UpdateUserChoice from "./containers/PartyEvents/EventForUser/UpdateUserChoices/UpdateUserChoice";
import FoodCreatorChoice from "./containers/PartyEvents/EventForCreator/FoodCreatorChoice/FoodCreatorChoice";
import DrinkCreatorChoice from "./containers/PartyEvents/EventForCreator/DrinkCreatorChoice/DrinkCreatorChoice";
import CreatorChoicesCards from "./containers/PartyEvents/EventForCreator/CreatorChoicesCards/CreatorChoicesCards";
import UpdateCreatorChoice from "./containers/PartyEvents/EventForCreator/UpdateCreatorChoices/UpdateCreatorChoice";
import AddUserToEvent from "./containers/PartyEvents/AddUserToEvent/AddUserToEvent";
import ChoicesUserTabComponent from "./containers/PartyEvents/EventForUser/ChoicesUserTabComponent/ChoicesUserTabComponent";
import ChoicesCreatorTabComponent from "./containers/PartyEvents/EventForCreator/ChoicesCreatorTabComponent/ChoicesCreatorTabComponent";

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
    this.setupBeforeUnloadListener();
  }

  doSomethingBeforeUnload = () => {
    // localStorage.clear();
  };

  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      return this.doSomethingBeforeUnload();
    });
  };

  render() {
    let routes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/events" component={PartyEvents} />
        <Route
            exact
            path="/events/addUserToEvent"
            component={AddUserToEvent}
          />
        <Route path="/" component={FrontPage} />
      </Switch>
    );

    if (localStorage.getItem("token")) {
      routes = (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/events" component={PartyEvents} />
          <Route exact path="/events/create-event" component={CreateEvent} />
          <Route
            path="/events/eventForUser/userChoices"
            component={ChoicesUserTabComponent}
          />
          <Route
            exact
            path="/events/create-event/add-ingredients"
            component={AddIngredientsToEvent}
          />
          <Route
            exact
            path="/events/eventForUser/userChoicesCards"
            component={UserChoicesCards}
          />
          <Route exact path="/events/eventForUser" component={EventForUser} />
          <Route
            exact
            path="/events/eventForUser/updateUserChoice"
            component={UpdateUserChoice}
          />
          <Route
            path="/events/eventForCreator/creatorChoices"
            component={ChoicesCreatorTabComponent}
          />
          <Route
            exact
            path="/events/eventForCreator"
            component={EventForCreator}
          />
          {/* <Route
            exact
            path="/events/eventForCreator/foodCreatorChoice"
            component={FoodCreatorChoice}
          />
          <Route
            exact
            path="/events/eventForCreator/drinkCreatorChoice"
            component={DrinkCreatorChoice}
          /> */}
          <Route
            exact
            path="/events/eventForCreator/updateCreatorChoice"
            component={UpdateCreatorChoice}
          />
          <Route
            exact
            path="/events/eventForCreator/CreatorChoicesCards"
            component={CreatorChoicesCards}
          />
          <Route
            exact
            path="/events/addUserToEvent"
            component={AddUserToEvent}
          />
          <Route path="/" component={FrontPage} />
        </Switch>
      );
    }

    return (
      <div className="App">
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
