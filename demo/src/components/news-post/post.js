import React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import {
  Container, Row, Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";
import { Link } from "react-router-dom";
import * as actions from '../../store/actions/index';



class posts extends React.Component {

  state ={
    name:"",
    userId:"",
    redirect :"",
    image : "",
    likes_icon:"material-icons-outlined",
    dislikes_icon:"material-icons-outlined"

  }

  componentDidMount=(state)=>{
      axios.get('http://localhost:8080/user/publicprofile/'+this.props.user )
      .then(response  => {
      //  console.log(response);
       console.log(this.props.token_a);
       this.setState({image:'http://localhost:8080/'+this.props.image});
        this.setState({name:response.data.user.name});
        this.setState({userId:this.props.user});
        
      });
  }
  

  handleIncrement = () => {
    this.setState({ likes_icon:"material-icons-round"})
  }


  handleDecrement = () => {
    this.setState({ dislikes_icon:"material-icons-round"})
  }


  goToPost = (Id) =>{
    console.log(Id);
    this.setState({redirect:Id})
    
  };

  render() {
    const {redirect} = this.state;
        if (redirect){
          return <Redirect to={{
            pathname: `/fullPost/${this.state.redirect}`,
            state: { id: this.props.id , name: this.state.name}
        }}
  /> ;
      } 
    return (
    <Container>
      <Row>
        <Col>
    <Card>
      <CardImg top src={this.state.image} style={{ maxHeight: "330px" }}/>
      <CardBody className="border-bottom">
        <CardTitle>{this.props.title}
          </CardTitle>
         
          <span className="float-right" style={{fontSize:"15px"}}>7/12/2019 | by {this.state.name}</span> 
      </CardBody>

      <CardFooter style={{height:"70px"}}>
      <div className="w-100" >

      <div className="mr-5 ml-3 float-left" onClick={this.handleIncrement}>
            <i class={this.state.likes_icon}  style={{color:"#1565C0",fontSize:"30px"}}>thumb_up_alt</i>
            <span>{this.props.likes}</span>
        </div>

        <div className="mr-5 float-left" onClick={this.handleDecrement}>
            <i class={this.state.dislikes_icon} style={{color:"#1565C0",fontSize:"30px"}}>thumb_down_alt</i>
            <span>{this.props.dislike}</span>
        </div>
{/* 
        <div className="mr-5 float-left">
            <i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>comment</i>
            <span>5</span>
        </div> */}

        <div className="mr-5 float-left">
            <i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>share</i>
            <span>3</span>
        </div>


        <div className="ml-5 float-right">
          <Button onClick={() => this.goToPost(this.props.id)} >Read more &rarr;</Button>
        </div>

    </div>
  </CardFooter>
      </Card>
      <br></br>
      </Col>
    </Row>
  </Container>
  );

  };
}

const mapStateToProps = state => {
  return {
      token_a : state.auth.userId,
  };
};

export default withRouter(connect( mapStateToProps, null )(posts));
