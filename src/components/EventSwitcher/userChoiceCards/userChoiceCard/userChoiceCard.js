import React from 'react';
import classes from './userChoiceCard.module.css';
import Button from '../../../UI/Button/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import alcoholImg from '../../../../assests/alcohol.png';
import foodImg from '../../../../assests/food.png';

const userChoiceCard = props => {
  let choices = [];
  for (let key in props.choiceIngs) {
    choices.push({ name: key, amount: props.choiceIngs[key] });
  }

  const ingredient = choices.map((choice, index) => (
    <div key={index} className={classes.ChoiceLine}>
      <span>{choice.name}</span>
      <span className={classes.Spacer} />
      <span>{choice.amount}</span>
    </div>
  ));

  const color = props.type === 'foodChoices' ? '#f88007' : '#55c2bc';
  return (
    <div className={classes.UserChoiceCards}>
      <ExpansionPanel className={classes.UserChoiceCardWrapper} square={true}>
        <ExpansionPanelSummary
          className={classes.PanelSummary}
          expandIcon={<ExpandMoreIcon style={{ color: color }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <img
            src={props.type === 'foodChoices' ? foodImg : alcoholImg}
            alt='icon'
          />
          <span className={classes.Title}>Order {props.orderNumber}</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.PanelDetails}>
          <div>{ingredient}</div>
          <div className={classes.Buttons}>
            <Button
              btnType='CardDelete'
              clicked={() =>
                props.onDelete(
                  props.choiceLocationId,
                  props.choice._id,
                  props.type
                )
              }
            >
              Delete Me
            </Button>
            <Button
              btnType='CardEdit'
              clicked={() =>
                props.onUpdate(props.choice, props.choiceLocationId, props.type)
              }
            >
              Edit Me
            </Button>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default userChoiceCard;
