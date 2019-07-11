import React, { Component } from "react";
import classes from "./EventForUser.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Auxillary/Auxillary";

import InsideUserMenu from "../../../hoc/InsideUserMenu/InsideUserMenu";

class EventForUser extends Component {
  componentDidMount() {
    if (
      !this.props.event &&
      !localStorage.getItem("eventId") &&
      this.props.location.state
    ) {
      this.props.onFetchSingleUserEvent(this.props.location.state.eventId);
    }
    if (this.props.event && !localStorage.getItem("eventId")) {
      localStorage.setItem("eventId", this.props.event._id);
    }
    if (!this.props.event && localStorage.getItem("eventId")) {
      this.props.onFetchSingleUserEvent(localStorage.getItem("eventId"));
    }

    if (
      !this.props.event &&
      !localStorage.getItem("eventId") &&
      !this.props.location.state
    ) {
      this.props.history.push({
        pathname: "/events"
      });
    }
  }

  render() {
    let eventInfo = <Spinner />;

    let usersList = null;

    if (this.props.event) {
      usersList = this.props.event.users.map(user => {
        return <li key={user.user._id}>{user.user.nickname}</li>;
      });

      eventInfo = (
        <Aux>
          <h3>{this.props.event.title}</h3>
          <h4>
            {new Date(this.props.event.date).toLocaleDateString("he-He")} -{" "}
            {this.props.event.address}
          </h4>
          <p>{this.props.event.description}</p>
          <ul>{usersList}</ul>
        </Aux>
      );
    }

    return (
      <InsideUserMenu>
        {!this.props.isAuth ? <Redirect to="/login" /> : null}
        <div className={classes.EventWrapper}>{eventInfo}</div>
      </InsideUserMenu>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  isAuth: state.auth.isAuthenticated || localStorage.getItem('token'),
  loading: state.singleEvent.loading,
  userId: state.auth.userId,
  ings: state.singleEvent.ingredients,
  isEvent: state.singleEvent.event !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForUser);
