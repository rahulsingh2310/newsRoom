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

class FullNewspost extends React.Component {

  state ={
    post:{
    },
    likeCount:"",
    dislikeCount:""
  };

  componentDidMount(){
    axios.get( 'http://localhost:8080/feed/post/'+ this.props.id)
    .then( response => {
      console.log(response);
      this.setState({post:response.data.post});
      this.setState({likeCount:response.data.post.likes.length});
      this.setState({dislikeCount:response.data.post.dislikes.length});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
  });
    
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
      <Card>
        {/*<CardHeader>Card header</CardHeader>
        */}
  
        <CardImg top src="car.jpg"/>
  
  
        <CardBody>
          <CardTitle>{this.state.post.title}</CardTitle>
          <p>{this.state.post.content}</p>
  
      </CardBody>
      <CardFooter style={{height:"70px"}}>
      <div className="w-100" >

        <div className="mr-5 ml-3 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_up_alt</i>
            <span>{this.state.likeCount}</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_down_alt</i>
            <span>{this.state.dislikeCount}</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>comment</i>
            <span>5</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>share</i>
            <span>3</span>
        </div>

    </div>
  </CardFooter>
  
        {/*<CardFooter>Card footer</CardFooter>*/}
      </Card>
  
      < br></br>
  
  
      </Col>
    </Row>
  </Container>
  
  
  )};
}

export default FullNewspost;
