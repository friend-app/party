import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

import EventForCreator from '../../../components/EventSwitcher/EventForCreator/EventForCreator';
import EventForUser from '../../../components/EventSwitcher/EventForUser/EventForUser';

import Spinner from '../../../components/UI/Spinner/Spinner';

class PartyEvent extends Component {
  componentWillMount() {
    if (this.props.location.state.eventId) {
      this.props.onFetchSingleEvent(this.props.location.state.eventId);
    }
  }

  render() {

    if (!this.props.token) {
      return <Redirect to='/login' />;
    }

    let witchEvent = <Spinner />;
    if (this.props.event) {
      // const userDataById = this.props.event.users.find(
      //   user => user.userId === this.props.location.state.eventId
      // );

      console.log(this.props.userId, this.props.event.creatorId)
      if (this.props.userId === this.props.event.creatorId) {
        witchEvent = (
          <EventForCreator showUserInfo={true} eventInfo={this.props.event} />
        );
      } else {
        witchEvent = (
          <EventForUser
            // userData={userDataById}
            EventControls={this.props.event.ingredients}
          />
        );
      }
    }

    return <div>{witchEvent}</div>;
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  token: state.auth.token,
  loading: state.singleEvent.loading,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleEvent: eventId => dispatch(actions.fetchSignleEvent(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyEvent);
