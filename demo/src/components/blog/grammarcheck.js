import React from "react";
import { Card,CardHeader,CardBody,ListGroup,
    ListGroupItem,
    FormCheckbox,Button,Row,Col } from "shards-react";

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


class Grammarcheck extends React.Component {

    state = {
        grammar:"Subscribe"
    };
  
    checkhandler = () => {
      axios({ method:'post',url:'http://localhost:8080/feed/post/like/'+this.props.id,
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
      .then(response  => {
        // console.log('likeddd');
        // console.log(this.props.liked);
      });
    }
  

  render() {
    return (
        <Card small className="blog-comments sticky-top" style={{top:"170px"}} >
         <CardBody className="p-0">
        <Row>
        <Col className="mt-3">
        <strong className=" ml-3">Are you interested in Grammarcheck ?</strong>
        </Col>
        
        
        </Row>
        <Button className="mt-2 mb-3 ml-3" onclick={this.checkhandler}>{this.state.grammar}</Button>
        <br></br>
        <Row className="ml-3">
        <strong className="" style={{color:"#1565C0"}}><i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>check</i>
            Grammarcheck has sent you an email.<br></br> &nbsp; &nbsp; &nbsp; &nbsp; Please check your email.</strong>
        </Row>
        </CardBody>
  </Card>
    );
  }
}


const mapStateToProps = state => {
  return {
      id : state.auth.userId,
  };
};

export default withRouter(connect( mapStateToProps, null )(Grammarcheck));


