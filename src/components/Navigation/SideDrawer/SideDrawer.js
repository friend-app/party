import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';
import drawerImg from '../../../assests/pary_img.jpg';
import { UPLOADS_BASE_URL } from '../../../shared/URLS';

const SideDrawer = props => {
  let BdClasses = [classes.SideDrawer, classes.Close];
  if (props.isOpen) {
    BdClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.isOpen} clicked={props.closed} />
      <div className={BdClasses.join(' ')} onClick={props.closed}>
        <div className={classes.drawerImg}>
          <img src={drawerImg} alt='drawerImg' />
        </div>
        {props.isAuth ? (
          <div className={classes.DrawerUserIcon}>
            <div
              className={classes.BgUserImg}
              style={{
                backgroundImage:
                  'url(' +
                  UPLOADS_BASE_URL +
                  localStorage.getItem('photo') +
                  ')'
              }}
            >
              {' '}
            </div>
          </div>
        ) : null}
        <h3>{localStorage.getItem('nickname')}</h3>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
