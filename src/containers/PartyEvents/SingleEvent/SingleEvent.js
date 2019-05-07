import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

import Event from '../../../components/Event/Event';
import Spinner from '../../../components/UI/Spinner/Spinner';



class PartyEvent extends Component {

  componentDidMount() {
    if(this.props.match.params.eventId){
      this.props.onFetchSingleEvent(this.props.match.params.eventId);
    }
  }

  render() {
    if(!this.props.fakeToken) {
      return (<Redirect to='/login' />)
     }
     
    return <div>
     {this.props.event ? <Event showUserInfo={true} eventInfo={this.props.event} /> : <Spinner />} 
    </div>;
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  fakeToken: state.auth.fakeToken,
  loading: state.party.loading
});

const mapDispatchToProps = dispatch =>{
  return {
    onFetchSingleEvent: (eventId) => dispatch(actions.fetchSignleEvent(eventId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyEvent);
