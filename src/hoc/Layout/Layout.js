import React from 'react';
import Aux from '../Auxillary/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
  return (
    <div>
      <Aux>
        <Toolbar />
        <main style={{marginTop: '56px'}}>{props.children}</main>
      </Aux>
    </div>
  )
}

export default Layout
