import React from "react";
import { Card,CardHeader,CardBody,ListGroup,
    ListGroupItem,
    FormCheckbox,Button,Row,Col } from "shards-react";

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


class Grammarcheck extends React.Component {

    state = {
        grammar:"I am intrested",
        interested: false,
    };

    componentDidMount(){
      axios({ method:'get',url:'http://localhost:8080/user/profile',
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
      .then(response  => {
        if(response.data.user.interests.indexOf("Grammar-Check") >= 0){
          this.setState({interested:true});
        }
        console.log(response);
        console.log(this.state.interested);
      }).catch(err => {
          console.log(err);
      });
    };
  
    checkhandler = () => {
      axios({ method:'post',url:'http://localhost:8080/user/interested',
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
      .then(response  => {
        console.log(response);
      }).catch(err => {
          console.log(err);
      });
    }
  

  render() {
    return (
        <Card small className="blog-comments sticky-top" style={{top:"170px"}} >
         <CardBody className="p-0">
        <Row>
        <Col className="mt-3">
        {this.state.interested===false ? <strong className=" ml-3">Are you interested in Grammarcheck ?</strong> : <div></div>}
        </Col>
        
        
        </Row>
        {this.state.interested===false ? <Button className="mt-2 mb-3 ml-3" onClick={this.checkhandler}>{this.state.grammar}</Button> : <div></div>}

        <br></br>
        <Row className="ml-3">

          {/* <Button className="mt-2 mb-3 ml-3" onClick={this.checkhandler}>{this.state.grammar}</Button> */}
          {this.state.interested===true ? <div> <strong className="" style={{color:"#155C0"}}><i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>check</i>
            Grammarcheck has sent you an email.<br></br> &nbsp; &nbsp; &nbsp; &nbsp; Please check your email.</strong></div> : <div></div>}
       
        </Row>
        </CardBody>
  </Card>
    );
  }
}


const mapStateToProps = state => {
  return {
      token : state.auth.token,
  };
};

export default withRouter(connect( mapStateToProps, null )(Grammarcheck));


