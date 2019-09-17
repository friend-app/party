import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import loginImg from "../../../assests/login.png";
import signupImg from "../../../assests/singup.png";
import eventsImg from "../../../assests/event_menu_icon.png";
import createEventImg from "../../../assests/ctrate_menu_icon.png";
import logoutImg from "../../../assests/logout_menu-icon.png";

const NavigationItems = props => {
  return (
    <div>
      <nav className={classes.NavigationItems}>
        {!props.isAuth ? (
          <Aux>
            <NavigationItem link="/login">
                <img src={loginImg} alt="menuICon" />
                <span>Login</span>
            </NavigationItem>
            <NavigationItem link="/signup">
              <img src={signupImg} alt="menuICon" />
                <span>Signup</span>
            </NavigationItem>
          </Aux>
        ) : (
          <Aux>
            <NavigationItem link="/allEvents">
            <img src={eventsImg} alt="menuICon" />
                <span>Events</span>
            </NavigationItem>
            <NavigationItem link="/events/create-event">
            <img src={createEventImg} alt="menuICon" />
                <span>Create Event</span>
            </NavigationItem>
            <NavigationItem link="/logout">
              <img src={logoutImg} alt="menuICon" />
                <span>Logout</span>
            </NavigationItem>
          </Aux>
        )}
      </nav>
    </div>
  );
};

export default NavigationItems;
