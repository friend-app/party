import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sidedrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    let mainClasses = [classes.Main, classes.MenuClose];
    let mainlost = "MenuClose";
    if (this.state.showSideDrawer) {
      mainClasses = [classes.Main, classes.MenuOpen];
      mainlost = "MenuOpen";
    }

    return (
      <div className={classes.Layout}>
        <Aux>
          <SideDrawer
          isAuth={this.props.isAuth}
            closed={this.sidedrawerClosedHandler}
            isOpen={this.state.showSideDrawer}
          />
          <Toolbar
            isAuth={this.props.isAuth}
            drawerStatus={mainlost}
            drawerToggleClick={this.sideDrawerToggleHandler}
          />
          <main className={mainClasses.join(" ")}>{this.props.children}</main>
        </Aux>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
