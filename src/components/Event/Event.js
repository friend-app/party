import React from 'react';
import classes from './Event.module.css';
import EventUserInfo from './EventUserInfo/EventUserInfo';
import Aux from '../../hoc/Auxillary/Auxillary';

const event = props => {
  const eventUsers = props.eventInfo.eventUsers.map(event => (
    <EventUserInfo showUserInfo={props.showUserInfo} key={event.userId} usersInfo={event} />
  ));

  return (
    <div className={classes.EventWrapper} onClick={props.clicked}>
      <h2>
        {props.eventInfo.eventName} - {props.eventInfo.eventFoodChoice} -{' '}
        {props.eventInfo.eventTime}
      </h2>
      <div className={classes.EventInside}>
       {props.showUserInfo ? <Aux> {eventUsers} </Aux> : null}
      </div>
    </div>
  );
};

export default event;
