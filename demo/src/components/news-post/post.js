import React from "react";
import axios from 'axios';

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


class posts extends React.Component {

  state ={
    name:"",
    userId:""
  }
  componentDidMount=(state)=>{
      axios.get('http://localhost:8080/user/publicprofile/'+this.props.user )
      .then(response  => {
       console.log(response);
        this.setState({name:response.data.user.name});
        this.setState({userId:this.props.user})
      });
  }
  

  render() {
    return (
    <Container>
      <Row>
        <Col>
    <Card>
      <CardImg top src="car.jpg" style={{ maxHeight: "330px" }}/>
      <CardBody className="border-bottom">
        <CardTitle>{this.props.title}
          </CardTitle>
         
          <a href=""><span className="float-right" style={{fontSize:"15px"}}>{this.state.name}</span></a> 
      </CardBody>

      <CardFooter style={{height:"70px"}}>
      <div className="w-100" >

        <div className="mr-5 ml-3 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_up_alt</i>
            <span>{this.props.likes}</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_down_alt</i>
            <span>{this.props.dislike}</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>comment</i>
            <span>5</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>share</i>
            <span>3</span>
        </div>


        <div className="ml-5 float-right">
          <Button tag={Link} to="/news-full-post" >Read more &rarr;</Button>
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

export default posts;