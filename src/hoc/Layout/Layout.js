import React from "react";
import { connect } from "react-redux";
import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = props => {
  return (
    <div>
      <Aux>
        <Toolbar isAuth={props.isAuth} />
        <main style={{ marginTop: "56px" }}>{props.children}</main>
      </Aux>
    </div>
  );
};

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
