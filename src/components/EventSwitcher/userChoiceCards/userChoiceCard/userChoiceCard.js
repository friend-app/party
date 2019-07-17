import React from "react";
import classes from "./userChoiceCard.module.css";
import Button from "../../../UI/Button/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const userChoiceCard = props => {
  let choices = [];
  for (let key in props.choiceIngs) {
    choices.push({ name: key, amount: props.choiceIngs[key] });
  }

  const ingredient = choices.map((choice, index) => (
    <h2 key={index}>
      <strong>
        {choice.name}: {choice.amount}
      </strong>
    </h2>
  ));

  return (
    <ExpansionPanel className={classes.userChoiceCardWrapper}>
      <ExpansionPanelSummary
        square={false}
        expandIcon={<ExpandMoreIcon color={'orange'} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className={classes.Title}>Order {props.orderNumber}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <h3>User Name: {props.userName}</h3>
        <Button
          btnType="Success"
          clicked={() =>
            props.onUpdate(props.choice, props.choiceLocationId, props.type)
          }
        >
          Edit Me
        </Button>
        {ingredient}
        <Button
          btnType="Danger"
          clicked={() =>
            props.onDelete(props.choiceLocationId, props.choice._id, props.type)
          }
        >
          Delete Me
        </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default userChoiceCard;
