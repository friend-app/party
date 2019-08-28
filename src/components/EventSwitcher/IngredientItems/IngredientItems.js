import React from "react";
import classes from "./IngredientItems.module.css";
import IngredientItem from "./IngredientItem/IngredientItem";
import foodImg from '../../../assests/food.png';
import drinkImg from '../../../assests/alcohol.png';

const IngredientsItems = props => {
  const keys = Object.keys(props.ings);
  let items = null;

items = keys.map((key, index) => (
  <IngredientItem key={index} ing={key} amount={props.ings[key]} />
));

  return (
    <div className={classes.IngredientItemsWrapper}>
      <div className={classes.Title}>
      <img src={props.type === 'food' ? foodImg: drinkImg} alt="foodIcon" />
      <h3>{props.title}</h3>
      </div>
      {items}
    </div>
  );
};

export default IngredientsItems;
