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

class UserDetails1 extends React.Component{
  state = {
      profile:{

      },
      followers:""
     };

   componentDidMount(){

    axios({ method:'get',url:'http://localhost:8080/user/profile',
    headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }})
    .then( response => {
      console.log(response.data.user);

      this.setState({profile:response.data.user});
      this.setState({followers: response.data.user.followers.length});
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
          alt={this.state.profile.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{this.state.profile.name}</h4>
      <span className="text-muted d-block mb-2">{this.state.profile.status}</span>
      <span className="text-muted d-block mb-2"><i className="material-icons mr-1">rss_feed</i>
       Followers {this.state.followers}</span>
     
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {this.props.userDetails.metaTitle}
        </strong>
        <span>{this.state.profile.description}
        </span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}
}


// UserDetails1.propTypes = {
//   /**
//    * The user details object.
//    */
//   userDetails: PropTypes.object
// };

UserDetails1.defaultProps = {
  userDetails: {
    name: "Chris messina",
    avatar: require("./avatar.png"),
    jobTitle: "Project Manager",
    metaTitle: "Description",
    metaValue:
      "Chris Messina has spent over 15 years  living on the edge of social technology."
  }
};


export default UserDetails1;