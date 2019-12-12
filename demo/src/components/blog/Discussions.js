import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  Progress
} from "shards-react";







class Discussions extends React.Component {

  // componentDidUpdate(){
  //   axios.get( 'http://localhost:8080/feed/posts')
  //   .then( response => {
  //     this.setState({posts:response.data.posts});
  //     // console.log('dshdvhsvdvsd')
  //     console.log(this.state.posts);
  //     console.log(this.props.userid);
  //     // const like = response.data.posts.
  //   });
  // }
  state = {
    discussions: [
      {
        id: 1,
        author: {
          image: require("./avatar.png"),
          name: "Ranjan",
          url: "http://localhost:3000/user/profile/5df00d7f068e934168e15dbe",
          trustfactor:65
        }
      },
      {
        id: 2,
  
        author: {
          image: require("./avatar.png"),
          name: "Rahul",
          url: "http://localhost:3000/user/profile/5defdb1c5414ef3234fc72e4",
          trustfactor:75
        }
      },
      {
        id: 3,
  
        author: {
          image: require("./avatar.png"),
          name: "Ravish",
          url: "http://localhost:3000/user/profile/5dc1432f2ac4ea07ec6b0d14",
          trustfactor:6
        }
      },
      
  
    ]
  
  };
  


  render() {
    return (
      <Card small className="blog-comments sticky-top" style={{top:"289px"}}>
      <CardHeader className="border-bottom">
        <h6 className="m-0">People You May Know</h6>
      </CardHeader>
  
      <CardBody className="p-0">
        {this.state.discussions.map((discussion, idx) => (
          <div key={idx} className="blog-comments__item d-flex p-3" tag={Link} to={discussion.author.url}>
            {/* Avatar */}
  
            <div className="blog-comments__avatar mr-3">
              <img src={discussion.author.image} alt={discussion.author.name} />
            </div>
  
            <div className="w-50 mr-1">
              <a className="text-secondary" href={discussion.author.url}>
                {discussion.author.name}
              </a>
              <Progress
          theme="success"
          style={{ height: "6px",width:"75%" }}
          className="mb-3"
          value={discussion.author.trustfactor}
        />
  
              </div>
  
             
  
  </div>
        ))}
      </CardBody>
  
      <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            <Button theme="white" type="submit" onClick={() => console.log('worked')}>
              View All
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
);
  }

}



export default Discussions;
