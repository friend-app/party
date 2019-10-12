import React, { Component } from "react";
import classes from "./EventForCreator.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Aux from "../../../hoc/Auxillary/Auxillary";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import inviteImg from "../../../assests/invite.png";
import CreatorIcons from "../../../components/EventSwitcher/CreatorEventPage/UserIcons/UserIcons";
import CreatorUsersList from "../../../components/EventSwitcher/CreatorUsersList/CreatorUsersList";
import editImg from "../../../assests/edit.png";
import InsideCreatorMenu from "../../../hoc/InsideCreatorMenu/InsideCreatorMenu";
import { UPLOADS_BASE_URL, BASE_URL_WITHOUT_PORT } from "../../../shared/URLS";

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

  editEventRedirect = () => {
    this.props.history.push({
      pathname: "/events/eventForCreator/editEvent"
    });
  };

  render() {
    let eventInfo = <Spinner />;
    let choicesAmount = null;

    if (this.props.event && this.props.loading === false) {
      const creator = this.props.event.users.find(
        user => user.user._id === this.props.event.creatorId
      );

      choicesAmount = creator.foodChoices.length + creator.drinksChoices.length;

      const date = new Date(this.props.event.date);

      const updatedDate =
        date.getDate() +
        " " +
        date.toLocaleString("default", { month: "short" }) +
        ", " +
        date.toLocaleString("default", { year: "2-digit" });

      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Jerusalem"
      };

      let publishButton = (
        <Button btnType="PublishEvent" clicked={this.publishEvent}>
          Publish event
        </Button>
      );

      let shareWhatsappButton = null;
      let shareLinkButton = null;
      if (this.props.link) {
        shareWhatsappButton = (
          <WhatsappShareButton
            className={classes.WhatsappShare}
            url={
              "Join to " +
              this.props.event.title +
              " " +
              BASE_URL_WITHOUT_PORT +
              "events/addUserToEvent?eventCode=" +
              this.props.link
            }
          >
            <WhatsappIcon size={32} round={true} />
            <span>Share throught Whatsapp</span>
          </WhatsappShareButton>
        );
        shareLinkButton = (
          <CopyToClipboard
            text={
              BASE_URL_WITHOUT_PORT +
              "events/addUserToEvent?eventCode=" +
              this.props.link
            }
            onCopy={() => this.setState({ copied: true })}
          >
            <div className={classes.ShareButton}>
              <span>
                <img src={inviteImg} alt="icon" />
              </span>
              <span>Copy Link</span>
            </div>
          </CopyToClipboard>
        );
      }

      eventInfo = (
        <Aux>
          <div className={classes.ImgBox}>
            <img src={UPLOADS_BASE_URL + this.props.event.photo} alt="event" />
          </div>
          <div className={classes.MainInfo}>
            <div className={classes.Title}>
              <h2>{this.props.event.title}</h2>
              <img
                src={editImg}
                alt="editIcon"
                onClick={() => this.editEventRedirect()}
              />
            </div>
            <div className={classes.Creator}>
              <img
                src={UPLOADS_BASE_URL + creator.user.photo}
                alt="creatorPhoto"
              />
              <p>{creator.user.nickname}</p>
            </div>
            <div className={classes.DateAndTime}>
              <p className={classes.DateBox}>
                <span className={classes.DateTitle}>date: </span>
                {updatedDate}
              </p>
              <p className={classes.TimeBox}>
                <span className={classes.DateTitle}>time: </span>
                {new Date(this.props.event.date).toLocaleTimeString(
                  "us-Us",
                  options
                )}
              </p>
            </div>
            <div className={classes.Place}>
              <p className={classes.PlaceTitle}>Place: </p>
              <p className={classes.PlaceDesc}>{this.props.event.address}</p>
            </div>
            <div className={classes.Decription}>
              <p>{this.props.event.description}</p>
            </div>
          </div>
          <p />
          <div className={classes.UsersInfo}>
            <div className={classes.UserBox}>
              <CreatorIcons users={this.props.event.users} />
            </div>
            {shareWhatsappButton}
            {shareLinkButton}
            <CreatorUsersList
              creatorId={this.props.event.creatorId}
              eventId={this.props.event._id}
              usersInfo={this.props.event.users}
              clicked={this.props.onUserRemove}
            />
          </div>
          {!this.props.link ? publishButton : null}
        </Aux>
      );
    }

    return (
      <InsideCreatorMenu choicesAmount={choicesAmount}>
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
    onPublishEvent: eventId => dispatch(actions.publishEvent(eventId)),
    onUserRemove: (eventId, userId) =>
      dispatch(actions.removeUserFromEvent(eventId, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForCreator);
