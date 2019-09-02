import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxillary/Auxillary";

const SideDrawer = props => {
    let BdClasses = [classes.SideDrawer, classes.Close];
    if(props.isOpen) {
        BdClasses = [classes.SideDrawer, classes.Open];
    }
  return (
    <Aux>
      <Backdrop show={props.isOpen} clicked={props.closed} />
      <div className={BdClasses.join(' ')}>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
