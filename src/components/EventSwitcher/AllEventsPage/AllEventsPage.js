import React from 'react';
import classes from './AllEventsPage.module.css';
import UserIcons from './UserIcons/UserIcons';
import { UPLOADS_BASE_URL } from '../../../shared/URLS';

const allEventsPage = props => {
  const date = new Date(props.eventInfo.date);

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

  return (
    <div className={classes.AllEventsPageWrapper} onClick={props.clicked}>
      <div className={classes.ImgBox}>
        <img
          src={UPLOADS_BASE_URL + props.eventInfo.photo}
          alt='main'
        />
      </div>
      <h2>{props.eventInfo.title}</h2>
      <div className={classes.DateAndTime}>
        <p className={classes.DateBox}>
          <span className={classes.DateTitle}>date: </span>
          {updatedDate}
        </p>
        <p className={classes.TimeBox}>
          <span className={classes.DateTitle}>time: </span>
          {new Date(props.eventInfo.date).toLocaleTimeString('us-Us', options)}
        </p>
      </div>
      <div className={classes.UserBox}>
        <UserIcons users={props.eventInfo.users} />
      </div>
    </div>
  );
};

export default allEventsPage;
