import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sidedrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState({showSideDrawer: !this.showSideDrawer})
  }

  render() {
    let mainClasses = [classes.Main, classes.MenuClose];
    if (this.state.showSideDrawer) {
      mainClasses = [classes.Main, classes.MenuOpen];
    }

    return (
      <div className={classes.Layout}>
        <Aux>
          <Toolbar isAuth={this.props.isAuth} />
          <SideDrawer
            closed={this.sidedrawerClosedHandler}
            isOpen={this.state.showSideDrawer}
          />
          <main className={mainClasses.join(' ')}>{this.props.children}</main>
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
