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
import { Link } from "react-router-dom";


import PageTitle from "../components/common/PageTitle";
import Discussions from "./../components/blog/Discussions";
import Posts from "../components/news-post/post";
import axios from 'axios';
import { withRouter } from 'react-router-dom';


import Breakingnews from "../components/news-post/breaking-news";
import { throws } from 'assert';
import Categoriesbox from '../components/blog/categories';


class NewsPosts extends React.Component {
  state = {
    posts : []
  }
  
  componentDidMount(){
    axios.get( 'http://localhost:8080/feed/posts')
    .then( response => {
      this.setState({posts:response.data.posts});
      // console.log(response);

    });
  }
  

  render() {

    const News_posts = this.state.posts.map(posts => {
      return <Posts  key={posts._id} title={posts.title} likes={posts.likes.length} user={posts.creator} dislike={posts.dislikes.length} />;
    });
    
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

         <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="News Posts" className="text-sm-left" />
        </Row>

        <Row>
            <Col lg="8" md="12">
              {News_posts}
              {/* <p>{temp} </p> */}
            <br></br>
            </Col>
            {/* Discussions */}

            <Col lg="4" md="12" sm="12" className="mb-4">
              <Categoriesbox />
              <br></br>
              <Discussions />
            </Col>
        </Row>
      </Container>
    );
  }
}

// export default NewsPosts;

const mapStateToProps = state => {
  const hi = {
    isAuthenticated: state.auth.token !== null,
    email : state.auth.email,
};
  return hi
};


export default withRouter(connect( mapStateToProps, null)( NewsPosts ));