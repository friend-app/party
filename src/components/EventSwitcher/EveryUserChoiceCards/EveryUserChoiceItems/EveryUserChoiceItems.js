import React from 'react';
import classes from './EveryUserChoiceItems.module.css';
import foodImg from '../../../../assests/food.png';
import drinkImg from '../../../../assests/alcohol.png';
import EveryUSerChoiceItem from './EveryUserChoiceItem/EveryUserChoiceItem';

const EveryUserChoiceItems = props => {

  const ingsKeys = Object.keys(props.choice.choice);
  const ings = ingsKeys.map((ing, index) => (
    <EveryUSerChoiceItem ing={ing} amount={props.choice.choice[ing]} key={index} />
  ));
  return (
    <div className={classes.EveryChoiceWrapper}>
      <div className={classes.Title}>
        {
          (props.type === 'food' ? (
            <img src={foodImg} alt='foodIcon' />
          ) : (
            <img src={drinkImg} alt='drinkIcon' />
          ))
        }
      </div>
      <div className={classes.Content}>
        {ings}
      </div>
    </div>
  );
};

export default EveryUserChoiceItems;
