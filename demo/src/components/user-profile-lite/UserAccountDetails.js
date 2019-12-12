import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
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


class UserAccountDetails extends React.Component{
  state = {
    profile:{

    },
    name : "",
    description : " ",
    contact : "",
    state : "",

  };

  componentDidMount(){

    axios({ method:'get',url:'http://localhost:8080/user/profile',
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
    .then( response => {
      console.log(response.data.user);

      this.setState({profile:response.data.user});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err.response);
    });
  }; 


  update = () => {
    const data = {
      description : localStorage.getItem("description"),
      name : this.state.profile.name,
    }
    axios({ method:'get',url:'http://localhost:8080/user/updateprofile',
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }}, data)
    .then( response => {
      console.log(response.data.user);

      this.setState({profile:response.data.user});
    })
    .catch(err => {
      console.log(err.response);
    });
  }; 
  
  changehandler= (e,what) => {
    this.setState({what : e.target.value});
    localStorage.setItem(what, e.target.value);
  }


  render(){
    return(
      <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Account Details</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">Name</label>
                    <FormInput
                      id="feFirstName"
                      placeholder="Name"
                      value = {this.state.profile.name}
                      onChange={(e) => this.changehandler(e,"name")}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feCity">Contact</label>
                    <FormInput
                      id="feCity"
                      placeholder="9876543123"
                      value = {this.state.profile.mobile}

                      onChange={(e) => this.changehandler(e,"name")}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="feEmail"
                      
                      placeholder = {this.state.profile.email}
                      onChange={() => {}}
                    />
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      type="password"
                      id="fePassword"
                      placeholder="Password"
                      
                      onChange={() => {}}
                      autoComplete="current-password"
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Address</label>
                  <FormInput
                    id="feAddress"
                    placeholder="Address"
                    value = {this.state.profile.State}
                    onChange={(e) => this.changehandler(e,"state")}
                  />
                </FormGroup>
                <Row form>
                  {/* Description */}
                  <FormGroup>
                  <label htmlFor="feAddress">Description</label>
                  <FormInput
                    id="feAddress"
                    placeholder="Description"
                    value = {this.state.profile.description}
                    onChange={(e) => this.changehandler(e,"description")}
                  />
                </FormGroup>
                </Row>
                <Button theme="accent">Update Account</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>

    );
  };

}

export default UserAccountDetails;
