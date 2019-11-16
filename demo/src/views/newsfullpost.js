/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import { connect } from 'react-redux';


import PageTitle from "../components/common/PageTitle";

import FullNewspost from "../components/news-post/fullpost";



class NewsFullPosts extends React.Component {
  constructor(props){
    super(props);
}


  // componentDidMount =()=>{
  //   console.log(this.props.location.state.id);
  // }
  
  render() {

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
         <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="News Posts" className="text-sm-left" />
        </Row>
        <Row>
            <Col lg={{ size: 10, offset: 1 }} md="12">
              <FullNewspost id={this.props.location.state.id} creater={this.props.location.state.id}/>
            </Col>
        </Row>


      </Container>
    );
  };
}

export default NewsFullPosts;

// export default NewsFullPosts ;
