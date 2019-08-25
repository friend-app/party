import React from 'react'
import classes from './AdditionsItem.module.css';

const AdditionsItem = (props) => {
    return (
        <div className={classes.IngredientItemWrapper}>
            <span>{props.ing}</span>
            <span> {props.amount} users</span>
        </div>
    )
}
export default AdditionsItem
