import React from 'react';
import classes from './EventForCreator.module.css';
// import EventUserInfo from './EventUserInfo/EventUserInfo';
import Aux from '../../../hoc/Auxillary/Auxillary';

const eventForCreator = props => {
  let eventUsers = null;
  // if(props.showUserInfo){
  //   eventUsers = props.eventInfo.eventUsers.map(event => (
  //     <EventUserInfo showUserInfo={props.showUserInfo} key={event.userId} usersInfo={event} />
  //   ));
  // }
  
  // {props.eventInfo.eventFoodChoice} -{' '}
  return (
    <div className={classes.EventWrapper} onClick={props.clicked}>
      <h2>
        {props.eventInfo.title} - {new Date(props.eventInfo.date).toLocaleDateString("he-He")}
      </h2>
      <p>Creator: {props.eventInfo.nickname}</p>
      <div className={classes.EventInside}>
       {props.showUserInfo ? <Aux> {eventUsers} </Aux> : null}
      </div>
    </div>
  );
};

export default eventForCreator;
