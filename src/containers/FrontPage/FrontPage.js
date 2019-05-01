import React, { Component } from 'react';
import { connect } from 'react-redux';

class FrontPage extends Component {

  componentDidMount() {
    // console.log(this.props.loading);
  }
  
  render() {

    return (
      <div>
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
