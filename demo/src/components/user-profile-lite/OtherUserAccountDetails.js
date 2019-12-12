import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import UsersByDevice from "../blog/UsersByDevice";
import axios from 'axios';

class OtherUserAccountDetails extends Component {

  state ={
    name : "",
    email : "",
    id : "",
  }

  componentDidMount(){
    axios.get( 'http://localhost:8080/user/publicprofile/'+this.props.id)
    .then( response => {
      console.log(response);
      // console.log(this.props.match.params);
      this.setState({name:response.data.user.name});
      this.setState({email: response.data.user.email});
      // this.setState({following: response.data.user.followings.length});
      this.setState({id: this.props.id});
      console.log(this.state.id);
    if (response.data.user.followers.find(o => o._id === this.props.userid) != null ){
        console.log('followed hai');
        this.setState({follow : true});
      }
      else{
        this.setState({follow:false});
      }
      console.log(this.state.follow);

    })
    .catch(err => {
        console.log(err);
    });
  };

  render() {
    return(
      <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Details - </h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
  
                    <strong className="text-muted d-block mb-2">
                  First Name : {this.state.name}
                    </strong>
                  </Col>
                  
                </Row>
                <Row>
                                {/* <Col md="6" className="form-group">
  
                                  <strong className="text-muted d-block mb-2">
                                  Contact : {contact}
                                  </strong>
                                </Col> */}
                                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <strong className="text-muted d-block mb-2">
                    Email :{this.state.email}
                    </strong>
                  </Col>
                </Row>
  
                {/* <Row>
                <Col>
  
                  <strong className="text-muted d-block mb-2">
                    Address : {address}
                  </strong>
                </Col>
                </Row> */}
                <br></br>
  
  
                <Row form>
                <Col>
    <Button theme="accent">Interests</Button>
                  {/* City */}
                  <ListGroup>
      <ListGroupItem>Politics</ListGroupItem>
      <ListGroupItem>Sports</ListGroupItem>
      <ListGroupItem>Bollywood</ListGroupItem>
      <ListGroupItem>Business</ListGroupItem>
  
    </ListGroup>
    </Col>
    <Col  style={{maxWidth:"400px"}} className="mb-4">
      <UsersByDevice />
    </Col>
                  {/* State */}
  
                </Row>
  
                {/*<Button theme="accent">Update Account</Button>*/}
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
    )
  };

}

// OtherUserAccountDetails.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string,
//   firstname: PropTypes.string,
//   lastname: PropTypes.string,
//   email: PropTypes.string,
//   address: PropTypes.string,
//   dob: PropTypes.string,
//   age: PropTypes.number,
//   contact: PropTypes.string,
// };

// OtherUserAccountDetails.defaultProps = {
//   title: "Account Details",
//   name:"Chris Messina",
//   email:"chrismessina@gmail.com",
//   address:"2025 M Street, Northwest, Washington, DC, 20036",
//   dob:"Dec 13th,1984",
//   age:"35",
//   contact:"7852941247"
// };

export default OtherUserAccountDetails;
