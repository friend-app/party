import React, { Component } from "react";
import classes from "./EventForCreator.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Aux from "../../../hoc/Auxillary/Auxillary";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

import InsideCreatorMenu from "../../../hoc/InsideCreatorMenu/InsideCreatorMenu";

class EventForCreator extends Component {
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

  publishEvent = () => {
    this.props.onPublishEvent(this.props.event._id);
  };

  share = () => {};

  render() {
    let eventInfo = <Spinner />;
    let usersList = null;
    if (this.props.event && this.props.loading === false) {
      usersList = this.props.event.users.map(user => {
        return <li key={user.user._id}>{user.user.nickname}</li>;
      });

      let shareButton = (
        <Button btnType="Success" clicked={this.publishEvent}>
          Publish event
        </Button>
      );

      if (this.props.link) {
        shareButton = (
          <WhatsappShareButton
            url={
              "Join to " +
              this.props.event.title +
              " https://localhost:3000/events/addUserToEvent?=" +
              this.props.link
            }
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        );
      }

      eventInfo = (
        <Aux>
          <h3>{this.props.event.title}</h3>
          <h4>
            {new Date(this.props.event.date).toLocaleDateString("he-He")} -{" "}
            {this.props.event.address}
          </h4>
          <p>{this.props.event.description}</p>
          {shareButton}
          <p />
          <ul>{usersList}</ul>
        </Aux>
      );
    }

    return (
      <InsideCreatorMenu>
        {!this.props.isAuth ? <Redirect to="/login" /> : null}
        <div className={classes.EventWrapper}>{eventInfo}</div>
      </InsideCreatorMenu>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  loading: state.singleEvent.loading,
  userId: state.auth.userId,
  ings: state.singleEvent.ingredients,
  isAuth: state.auth.isAuthenticated || localStorage.getItem("token"),
  link: state.singleEvent.link
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleCreatedEvent(eventId)),
    onPublishEvent: eventId => dispatch(actions.publishEvent(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForCreator);
