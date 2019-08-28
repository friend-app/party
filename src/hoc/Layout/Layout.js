import React from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const Layout = props => {
  return (
    <div className={classes.Layout}>
      <Aux>
        <Toolbar isAuth={props.isAuth} />
        <main style={{ marginTop: '56px', position:'relative' }}>{props.children}</main>
      </Aux>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
