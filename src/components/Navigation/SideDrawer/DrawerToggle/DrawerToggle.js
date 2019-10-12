import React from 'react';
import classes from './Drawertoggle.module.css';

const DrawerToggle = (props) => {
    let drawerClasses = [classes.DrawerToggle, classes[props.status]];
    return (
        <div className={drawerClasses.join(' ')} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle
