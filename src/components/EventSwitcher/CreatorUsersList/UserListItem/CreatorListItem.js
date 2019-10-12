import React from "react";
import classes from "./CreatorListItem.module.css";
import { UPLOADS_BASE_URL } from "../../../../shared/URLS";

const Creator = props => {
  return (
    <div className={classes.UserItemWrapper}>
      <span>
        <img src={UPLOADS_BASE_URL + props.userPhoto} alt="main" />
      </span>
      <span>{props.userName}</span>
      <span className={classes.Spacer}></span>
      {props.userId !== props.creatorId ? (
        <span onClick={() => props.clicked(props.eventId, props.userId)}>
          x
        </span>
      ) : null}
    </div>
  );
};

export default Creator;
