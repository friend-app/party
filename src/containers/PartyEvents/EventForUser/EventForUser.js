import React, { Component } from 'react';
// import classes from "./EventForUser.module.css";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
// import Spinner from "../../../components/UI/Spinner/Spinner";
import FoodUserChoice from './FoodUserChoice/FoodUserChoice';
import DrinkUserChoice from './DrinkUserChoice/DrinkUserChoice';
import userChoicesCards from './UserChoicesCards/UserChoicesCards';
import Button from '../../../components/UI/Button/Button';
import InsideUserMenu from '../../../hoc/InsideUserMenu/InsideUserMenu';

class EventForUser extends Component {
  componentDidMount() {
    if (
      !this.props.event &&
      !localStorage.getItem('eventId') &&
      this.props.location.state
    ) {
      this.props.onFetchSingleUserEvent(this.props.location.state.eventId);
    }
    if (this.props.event &&
      !localStorage.getItem('eventId')) {
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
        pathname: '/events'
      });
    }
  }

  render() {
    return (
      <InsideUserMenu>
        <div />
      </InsideUserMenu>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  isAuth: state.auth.token !== null,
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
