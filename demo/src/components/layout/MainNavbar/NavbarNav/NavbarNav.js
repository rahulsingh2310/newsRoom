import React, { Component } from 'react';
import { Nav,Button } from "shards-react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Notifications from "./Notifications";
import UserActions from "./UserActions";

import * as actions from '../../../../store/actions/index';



class Navbar extends React.Component {

  render(){
    console.log(this.props.isAuthenticated);
    return(
      <Nav navbar className="border-left flex-row">
      <Notifications />
      <UserActions isauth={this.props.isAuthenticated} />
    </Nav>
  );

  };
}
    
const mapStateToProps = (state) => {
  const hi = state.auth.token;
  console.log(state);
  return {
      isAuthenticated: hi !== null,
  };
};

export default withRouter(connect( mapStateToProps, null)( Navbar ));

