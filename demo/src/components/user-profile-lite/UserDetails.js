import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class UserDetails extends React.Component{
     state ={
      name : "",
      follower : "",
      following : "",
      id : "",
      follow : false ,
      follow_logo:"person_add",
       follow_title:"Follow",
    }

    componentDidMount(){
      axios.get( 'http://localhost:8080/user/publicprofile/'+this.props.id)
      .then( response => {
        console.log(response);
        // console.log(this.props.match.params);
        this.setState({name:response.data.user.name});
        this.setState({follower: response.data.user.followers.length});
        this.setState({following: response.data.user.followings.length});
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

   handleClick = () => {
    axios({ method:'post',url:'http://localhost:8080/user/follow/'+this.state.id,
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
    .then( response => {
      // console.log(response);
      // console.log(this.state.follow);
      this.componentDidMount();
      console.log(this.state.follow);
      if(this.state.follow === true){
        this.setState({follow_title:"Follow"});
      }
      else {
        this.setState({follow_title:"unFollow"});
        

      }

    })
    .catch(err => {
      console.log(err.response);
    });

  }; 

  render() {
    return (
      <Card small className="mb-4 pt-3 sticky-top" style={{top:"69px"}}>
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={this.props.userDetails.avatar}
          alt={this.props.userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{this.state.name}</h4>
      <span className="text-muted d-block mb-2">{this.props.userDetails.jobTitle}</span>
      <span className="text-muted d-block mb-2"><i className="material-icons mr-1">rss_feed</i>
       Followed by {this.state.follower}</span>
      <Button pill outline size="sm" className="mb-2" onClick={this.handleClick}>
        <i className="material-icons mr-1">{this.state.follow_logo}</i>{this.state.follow_title}
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {this.props.userDetails.metaTitle}
        </strong>
        <span>{this.props.userDetails.metaValue}
        </span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}
}


UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Chris messina",
    avatar: require("./avatar.png"),
    jobTitle: "Project Manager",
    metaTitle: "Description",
    metaValue:
      "Chris Messina has spent over 15 years  living on the edge of social technology."
  }
};
const mapStateToProps = state => {
  return {
    email : state.auth.email,
    userid : state.auth.userId,
  };
};
export default withRouter(connect( mapStateToProps, null)( UserDetails ));

