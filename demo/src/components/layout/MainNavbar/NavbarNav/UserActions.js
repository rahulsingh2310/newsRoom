import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import {Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

const navigationItems = ( props ) => (  

  <NavItem >

    <div className="text-nowrap px-3 mt-2">
      <img
        className="user-avatar rounded-circle mr-2"
        src={require("./../../../../images/avatars/0.jpg")}
        alt="User Avatar"
      />{" "}
      {!props.isauth ? <Button tag={Link} to="/auth/login" theme="primary">Login</Button> : <Button tag={Link} to="/logout" theme="primary">Logout</Button>}
     
      {/* <a tag={Link} to="/auth/login"><span  className="d-none d-md-inline-block">Login/Signup</span></a> */}
    </div>
    {/* <Collapse tag={DropdownMenu} right small open={this.state.visible}>
      <DropdownItem tag={Link} to="/user-profile-lite">
        <i className="material-icons">&#xE7FD;</i> Profile
      </DropdownItem>

      <DropdownItem divider />
      <DropdownItem tag={Link} to="/" className="text-danger">
        <i className="material-icons text-danger">&#xE879;</i> Logout
      </DropdownItem>
    </Collapse> */}
  </NavItem>
);

export default navigationItems;


