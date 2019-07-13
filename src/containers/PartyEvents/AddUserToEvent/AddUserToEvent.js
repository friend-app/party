import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as actions from "../../../store/actions/index";
import Spinner from '../../../components/UI/Spinner/Spinner';

class AddUserToEvent extends Component {
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const params = {};
    for (let param of query.entries()) {
      params[param[0]] = param[1];
    }
    if (Object.keys(params).length === 0) {
      this.props.history.push({
        pathname: "/events"
      });
    }
    if (
      localStorage.getItem("token") &&
      new Date(localStorage.getItem('expirationDate')) > new Date() &&
      Object.keys(params).length > 0 &&
      Object.keys(params).length < 2
    ) {
      this.props.onAddUserToEvent(params.eventCode);
    }
    if (
      !localStorage.getItem("token") && 
      Object.keys(params).length > 0 &&
      Object.keys(params).length < 2
    ) {
      localStorage.setItem('eventCode', params.eventCode);
      this.props.history.push({
        pathname: "/login"
      });
    }
  }

  render() {

    let redirect = <Spinner />;

    if(this.props.eventId) {
      redirect = <Redirect to="/events/eventForUser" />
    }

    return (
      <div>
        {redirect}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventId: state.addUserToEvent.eventId
});

const mapDispatchToProps = dispatch => {
  return {
    onAddUserToEvent: eventCode => dispatch(actions.addUserToEvent(eventCode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserToEvent);
