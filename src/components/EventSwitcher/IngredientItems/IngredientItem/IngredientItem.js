import React from 'react'
import classes from './IngredientItem.module.css';

const IngredientItem = (props) => {
    return (
        <div className={classes.IngredientItemWrapper}>
            <span>{props.ing}</span>
            <span> {props.amount}</span>
        </div>
    )
}

export default IngredientItem
