import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import OtherUserAccountDetails from "../components/user-profile-lite/OtherUserAccountDetails";

import Newspost from "../components/news-post/post";



class OtherUserProfileLite extends React.Component {
  state = {
    user : []

  }

 /* componentDidMount(){
    axios.get( 'http://localhost:8080/auth/user')
    .then( response => {
      this.setState({user:response.data.posts});
      console.log(response);
    });
  }
*/

  render () {
    return(
    <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <UserDetails />
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

export default OtherUserProfileLite;
