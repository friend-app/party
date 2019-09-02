import React, { Component } from 'react';
import classes from './EventForUser.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Auxillary/Auxillary';
import InsideUserMenu from '../../../hoc/InsideUserMenu/InsideUserMenu';
import UserIcons from '../../../components/EventSwitcher/AllEventsPage/UserIcons/UserIcons';
import UserUsersList from '../../../components/EventSwitcher/UserUsersList/UserUsersList';

class EventForUser extends Component {
  componentDidMount() {
    if (
      !this.props.event &&
      !localStorage.getItem('eventId') &&
      this.props.location.state
    ) {
      this.props.onFetchSingleUserEvent(this.props.location.state.eventId);
    }
    if (this.props.event && !localStorage.getItem('eventId')) {
      localStorage.setItem('eventId', this.props.event._id);
    }
    if (!this.props.event && localStorage.getItem('eventId')) {
      this.props.onFetchSingleUserEvent(localStorage.getItem('eventId'));
    }

    if (
      !this.props.event &&
      !localStorage.getItem('eventId') &&
      !this.props.location.state
    ) {
      this.props.history.push({
        pathname: '/'
      });
    }
  }

  render() {
    let eventInfo = <Spinner />;

    let userInfo = null;
   
    if (this.props.event) {
      const creator = this.props.event.users.filter(
        user => user.user._id === this.props.event.creatorId
      );
      const date = new Date(this.props.event.date);

      const updatedDate =
        date.getDate() +
        ' ' +
        date.toLocaleString('default', { month: 'short' }) +
        ', ' +
        date.toLocaleString('default', { year: '2-digit' });

      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Jerusalem'
      };

      eventInfo = (
        <Aux>
          <div className={classes.ImgBox}>
            <img
              src={'http://localhost:4000/uploads/' + this.props.event.photo}
              alt='event'
            />
          </div>
          <div className={classes.MainInfo}>
            <h2>{this.props.event.title}</h2>
            <div className={classes.Creator}>
              <img
                src={'http://localhost:4000/uploads/' + creator[0].user.photo}
                alt='creatorPhoto'
              />
              <p>{creator[0].user.nickname}</p>
            </div>
            <div className={classes.DateAndTime}>
              <p className={classes.DateBox}>
                <span className={classes.DateTitle}>date: </span>
                {updatedDate}
              </p>
              <p className={classes.TimeBox}>
                <span className={classes.DateTitle}>time: </span>
                {new Date(this.props.event.date).toLocaleTimeString(
                  'us-Us',
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
        </Aux>
      );

      userInfo = (
        <div className={classes.UsersInfo}>
          <div className={classes.UserBox}>
            <UserIcons users={this.props.event.users} />
          </div>
          <UserUsersList usersInfo={this.props.event.users} />
        </div>
      );
    }

    return (
      <InsideUserMenu>
        <div className={classes.EventWrapper}>
          {eventInfo} {userInfo}
        </div>
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
