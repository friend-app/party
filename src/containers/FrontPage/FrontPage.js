import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';

class FrontPage extends Component {

  componentDidMount() {
  }
  
  render() {
    return (
      <div>
        <Redirect to='/allEvents' />
        <h1>I'm front page!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
