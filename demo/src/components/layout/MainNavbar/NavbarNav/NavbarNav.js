import React from "react";
import { Nav,Button } from "shards-react";
import { Link } from "react-router-dom";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Button variant="primary" tag={Link} to="/auth/login">Login/Signup</Button>
    <Notifications />
    <UserActions />
  </Nav>
);
