import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import OtherUserAccountDetails from "../components/user-profile-lite/OtherUserAccountDetails";

import Newspost from "../components/news-post/post";
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class OtherUserProfileLite extends React.Component {

  render () {
    return(
    <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <UserDetails id={this.props.match.params.id}/>
      </Col>
      <Col lg="8">
        <OtherUserAccountDetails/>
        <Newspost/>
      </Col>
    </Row>
  </Container>


    )
  }

}
const mapStateToProps = state => {
  return {
    email : state.auth.email,
    userid : state.auth.userId,
  };
};


export default withRouter(connect( mapStateToProps, null)( OtherUserProfileLite ));
