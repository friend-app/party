import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from '../../components/EventSwitcher/EventForCreator/EventForCreator';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class PartyEvents extends Component {
  componentDidMount() {
    if(this.props.token)  {
       this.props.onFetchEvents('123')
    }
  }

  eventSelectedHandler = id => {
    this.props.history.push({pathname: '/events/' + id})
  }

  render() {
    if(!this.props.token) {
     return (<Redirect to='/login' />)
    }

    const events = this.props.events.map(event => (
      <Event key={event.id} eventInfo={event} clicked={() => this.eventSelectedHandler(event.id)} />
    ));


    return <div>{this.props.events.length !== 0 ? events : <Spinner />}</div>;
  }
}

const mapStateToProps = state => ({
  loading: state.party.loading,
  events: state.party.events,
  token: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchEvents: userId => dispatch(actions.fetchEvents(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyEvents);
