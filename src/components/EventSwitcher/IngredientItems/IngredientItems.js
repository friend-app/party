import React from "react";
import classes from "./IngredientItems.module.css";
import IngredientItem from "./IngredientItem/IngredientItem";

const IngredientsItems = props => {
  const keys = Object.keys(props.ings);
  let items = null;

items = keys.map((key, index) => (
  <IngredientItem key={index} ing={key} amount={props.ings[key]} />
));

  return (
    <div className={classes.IngredientItemsWrapper}>
      <h3>{props.title}</h3>
      {items}
    </div>
  );
};

export default IngredientsItems;
