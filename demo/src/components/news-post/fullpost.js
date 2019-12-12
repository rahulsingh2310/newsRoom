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
    likes_icon:"material-icons-outlined",
    dislikes_icon:"material-icons-outlined",
    comment_icon:"material-icons-outlined",
    post:{
    },
    image : "",
    likeCount:"",
    dislikeCount:""
  };

  handleIncrement = () => {
    if(this.state.likes_icon = "material-icons-outlined"){
    this.setState({ likes_icon:"material-icons-round"});
    }
    else{
      this.setState({ likes_icon:"material-icons-outlined"});
    }
  }


  handleDecrement = () => {
    this.setState({ dislikes_icon:"material-icons-round"})
  }

  componentDidMount(){
    axios.get( `http://localhost:8080/feed/post/${this.props.id.id}`)
    .then( response => {
      console.log(response);
      this.setState({post:response.data.post});
      this.setState({image:'http://localhost:8080/'+response.data.post.imageUrl});
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
  
        <CardImg top src={this.state.image}/>
  
  
        <CardBody>
          <CardTitle>{this.state.post.title}</CardTitle>
          <p>{this.state.post.content}</p>
          {/* <Button outline pill className="ml-5 float-right" onClick={() => this.goToProfile(this.props.user)} ><span className="float-right" style={{fontSize:"15px"}}>By {this.state.name}</span></Button>  */}
     
      </CardBody>
      <CardFooter style={{height:"70px"}}>
       <div className="w-100" >
 
        <Button outline pill theme="light" className="mr-5 ml-3 float-left" onClick={this.handleIncrement}>
            <i class={this.state.likes_icon}  style={{color:"#1565C0",fontSize:"30px"}}>thumb_up_alt</i>
            <span>{this.state.likeCount}</span>
        </Button>
      

        <Button outline pill theme="light" className="mr-5 float-left" onClick={this.handleDecrement}>
            <i class={this.state.dislikes_icon} style={{color:"#1565C0",fontSize:"30px"}}>thumb_down_alt</i>
            <span>{this.state.dislikeCount}</span>
        </Button>

        {/* <div className="mr-5 float-left">
            <i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>comment</i>
            <span>5</span>
        </div>
 */}

        <Button outline pill theme="light" className="mr-5 float-left">
            <i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>share</i>
            <span>3</span>
        </Button>

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
