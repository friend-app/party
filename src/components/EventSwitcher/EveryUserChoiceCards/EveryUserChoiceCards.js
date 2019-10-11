import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from './EveryUserChoiceCards.module.css';
import EveryUserChoiceItems from './EveryUserChoiceItems/EveryUserChoiceItems';
import { UPLOADS_BASE_URL } from '../../../shared/URLS';

const EveryUserChoiceCards = (props) => {
  const foodChoice = props.user.foodChoices.map((choice, index) => (
    <EveryUserChoiceItems key={index} choice={choice} type="food" />
  ))
  const drinkChoice = props.user.drinksChoices.map((choice, index) => (
    <EveryUserChoiceItems key={index} choice={choice} type="drink" />
  ))

  return (
    <div className={classes.EveryUserCardWrapper} >
 <ExpansionPanel className={classes.UserChoiceCardWrapper} square={true}>
    <ExpansionPanelSummary
    className={classes.PanelSummary}
      expandIcon={<ExpandMoreIcon style={{ color: '#55c2bc', padding: 0 }} />}
      aria-controls='panel1a-content'
      id='panel1a-header'
    >
       <img src={UPLOADS_BASE_URL + props.user.user.photo} alt="icon"></img><span className={classes.Title}>{props.user.user.nickname} {props.orderNumber}</span>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.PanelDetails}>
      {foodChoice}
      {drinkChoice}
    </ExpansionPanelDetails>
  </ExpansionPanel>
    </div>
   
  )
}

export default EveryUserChoiceCards
