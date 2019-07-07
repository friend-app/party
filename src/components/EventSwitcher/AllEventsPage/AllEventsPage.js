import React from 'react';
import classes from './AllEventPage.module.css';

const allEventsPage = props => {
  return (
    <div className={classes.AllEventsPageWrapper} onClick={props.clicked}>
      <h2>
        {props.eventInfo.title} - {new Date(props.eventInfo.date).toLocaleDateString("he-He")}{' - '} 
         {new Date(props.eventInfo.date).toLocaleTimeString("he-He")}
      </h2>
      <p>Creator: {props.eventInfo.nickname}</p>
    </div>
  );
};

export default allEventsPage;
