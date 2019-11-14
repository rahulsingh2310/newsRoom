import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const DefaultLayout1 = ({ children}) => (
  <Container fluid>
    <Row>
      
      <Col
        className="main-content p-0"
        lg="12"
        md="12"
        sm="12"
        tag="main"
      >
        
        {children}
        
      </Col>
    </Row>
  </Container>
);


export default DefaultLayout1;
