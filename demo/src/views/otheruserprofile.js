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

  state = {
    posts : []
  }
  
  componentDidMount(){
    axios.get( 'http://localhost:8080/feed/user_posts/'+this.props.match.params.id)
    .then( response => {
      this.setState({posts:response.data.posts.reverse()});
      // [...this.state.posts].reverse().map(createListItem, this);
      // console.log('dshdvhsvdvsd')
      // this.state.posts.reverse();
      console.log(this.state.posts);
      console.log(this.props.userid);
      // const like = response.data.posts.
    });
  }

  render () {

    const News_posts = this.state.posts.map(posts => {
      if(posts.likes.find(o => o._id === this.props.userid) != null)
       {
        return <Newspost  key={posts._id} id={posts._id}
        title={posts.title} liked={true} disliked = {false}
        user={posts.creator} 
         image={posts.imageUrl} 
          />
       } 
       else if(posts.dislikes.find(o => o._id === this.props.userid) != null)
       {
       return <Newspost  key={posts._id} id={posts._id}
         title={posts.title} 
         user={posts.creator}  liked={false} disliked={true}
          image={posts.imageUrl}  />
      } else{
        return <Newspost  key={posts._id} id={posts._id}
         title={posts.title} 
         user={posts.creator} liked={false} disliked={false}
          image={posts.imageUrl} />
      }
        
    });

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
        <OtherUserAccountDetails id={this.props.match.params.id} />
        {/* <Newspost id={this.props.match.params.id} /> */}
        {News_posts}
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
