import React from "react";
import classes from "./AdditionsItems.module.css";
import AdditionsItem from "./AdditionsItem/AdditionsItem";
import AdditionalImg from '../../../assests/additional.png';

const AdditionsItems = props => {

const items = props.add.map((key, index) => (
  <AdditionsItem key={index} ing={key} amount={props.usersAmount} />
));

  return (
    <div className={classes.IngredientItemsWrapper}>
      <div className={classes.Title}>
      <img src={AdditionalImg} alt="foodIcon" />
      <h3>{props.title}</h3>
      </div>
      {items}
    </div>
  );
};

export default AdditionsItems;
