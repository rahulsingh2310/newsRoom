import React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import altern from './car.jpg';

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
import NewsPosts from "../../views/NewsPosts";



class posts extends React.Component {

  state ={
    name:"",
    userId:"",
    redirect :"",
    redirectProfile :"",
    image : "",
    likes_icon:"material-icons-outlined",
    dislikes_icon:"material-icons-outlined",
    dislikenumber:"",
    likenumber:"",
    liked:false,
    disliked:false,

  }

  componentDidMount=(state)=>{
      axios.get('http://localhost:8080/user/publicprofile/'+this.props.user )
      .then(response  => {
      //  console.log(response);
      //  console.log(this.props.token_a);
       this.setState({image:'http://localhost:8080/'+this.props.image});
        this.setState({name:response.data.user.name});
        this.setState({userId:this.props.user});
        this.setState({liked:this.props.liked});
        this.setState({disliked:this.props.disliked})
        // console.log(this.props.liked);
        // console.log(this.props.dislike);
      });

    axios.get( 'http://localhost:8080/feed/post/'+this.props.id)
    .then( response => {
      
      this.setState({dislikenumber:response.data.post.dislikes.length});
      this.setState({likenumber:response.data.post.likes.length});
      console.log(this.state.post);
      // [...this.state.posts].reverse().map(createListItem, this);
      // console.log('dshdvhsvdvsd')
      // this.state.posts.reverse();
      // const like = response.data.posts.
    });










  }
  

  // handleIncrement = () => {

  //   this.setState({ likes_icon:"material-icons-round"})
  // }


  // handleDecrement = () => {
  //   this.setState({ dislikes_icon:"material-icons-round"})
  // }
   
  likehandler = () => {
    this.componentDidMount();
    axios({ method:'post',url:'http://localhost:8080/feed/post/like/'+this.props.id,
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
      .then(response  => {
        console.log('likeddd');
        console.log(this.props.liked);

        console.log(response);
        if(this.props.liked){
          this.setState({
            likes_icon:"material-icons-round"
          });
        }
      }); 
      
      this.componentDidMount();
  }


  dislikehandler = () => {
    this.componentDidMount();
    axios({ method:'post',url:'http://localhost:8080/feed/post/dislike/'+this.props.id,
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
      .then(response  => {
        console.log(response);
        if(this.props.disliked){
          this.setState({
            dislikes_icon:"material-icons-round"
          })
        }
      }); 
      this.componentDidMount();

  }

  goToPost = (Id) =>{
    // console.log(Id);
    this.setState({redirect:Id})
    
  };

  goToProfile = (Id) =>{
    // console.log(Id);
    this.setState({redirectProfile:Id})
    
  };
  render() {
    const {redirect} = this.state;
        if (redirect){
          return <Redirect to={{
            pathname: `/fullPost/${this.state.redirect}`,
        }}
  /> ;
      } 
      const {redirectProfile} = this.state;
      if (redirectProfile){
        return <Redirect to={{
          pathname: `/user/${this.state.redirectProfile}`,
      }}
/> ;
    } 
    return (
    <Container>
      <Row>
        <Col>
    <Card>
      <CardImg top src={this.state.image} alt={altern} style={{ maxHeight: "330px" }}/>
      <CardBody className="border-bottom">
        <CardTitle>{this.props.title}
          </CardTitle>
         
          <Button outline pill className="ml-5 float-right" onClick={() => this.goToProfile(this.props.user)} ><span className="float-right" style={{fontSize:"15px"}}>By {this.state.name}</span></Button> 
      </CardBody>

      <CardFooter style={{height:"70px"}}>
      <div className="w-100" >
      { this.props.token_a ? <Button outline pill theme="light" className="mr-3 ml-2 float-left" onClick={this.likehandler}>
            <i class={this.props.liked ? "material-icons-round" : "material-icons-outlined" } style={{color:"#1565C0",fontSize:"30px"}}>thumb_up_alt</i>
            <span>{this.state.likenumber}</span>
        </Button> 
        : <div></div> }
      
        { this.props.token_a
        ? <div><Button outline pill theme="light" className="mr-3 float-left" onClick={this.dislikehandler}>
        <i class={this.props.disliked ? "material-icons-round" : "material-icons-outlined"} style={{color:"#1565C0",fontSize:"30px"}}>thumb_down_alt</i>
        <span>{this.state.dislikenumber}</span>
    </Button></div>
        : <div></div>
      }

{/* 
        <div className="mr-5 float-left">
            <i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>comment</i>
            <span>5</span>
        </div> */}

        <Button outline pill theme="light" className="mr-5 float-left">
            <i class="material-icons" style={{color:"#1565C0",fontSize:"30px"}}>share</i>
            <span>3</span>
        </Button>


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
