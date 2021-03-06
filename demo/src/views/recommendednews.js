import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";


import PageTitle from "../components/common/PageTitle";
import Recommended from "../components/recommended/recommended";
import axios from 'axios';

class RecommendedNews extends Component {
  state = {
    news : [],
    image : "",

  }

  componentDidMount(){
    axios.get( 'http://localhost:8080/feed/newstorecommend')
    .then( response => {
      console.log(response);
      this.setState({news:response.data.post});
      // console.log(response);
    });
  }

  render () {
    const trending = this.state.news.map(tnews => {
      return <Recommended  key={tnews._id} title={tnews.title} body={tnews.content} image={tnews.imageUrl} />;
    });
    return (
      // <div>
      //   {trending}
      // </div>
      <Container fluid className="main-content-container px-4 pb-4">
         {/* Page Header */}
           <Row noGutters className="page-header py-4">
             <PageTitle sm="4" title="Recommended News" subtitle="News Posts" className="text-sm-left" />
           </Row>
      
           <Row>
             {/* Editor */}
             
             {trending }
             
           </Row>
       </Container>     
    );
  }
}

// const Trendingnews = () => (
//   <Container fluid className="main-content-container px-4 pb-4">
//     {/* Page Header */}
//     <Row noGutters className="page-header py-4">
//       <PageTitle sm="4" title="Trending News" subtitle="News Posts" className="text-sm-left" />
//     </Row>

//     <Row>
//       {/* Editor */}
//       <Col lg="12" md="12">
//         <Trending />
//       </Col>

//     </Row>
//   </Container>
// );

export default RecommendedNews;
