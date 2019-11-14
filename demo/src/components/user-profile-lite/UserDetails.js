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




class UserDetails extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
       follow_logo:"person_add",
       follow_title:"Follow",
       follow:true
     };

     // This binding is necessary to make `this` work in the callback
     this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
     this.setState(state => ({
       follow_logo:"person",
       follow_title:"Followed",
       follow:true

     }));
   }

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
      <h4 className="mb-0">{this.props.userDetails.name}</h4>
      <span className="text-muted d-block mb-2">{this.props.userDetails.jobTitle}</span>
      <span className="text-muted d-block mb-2"><i className="material-icons mr-1">rss_feed</i>
       Followed by 149 people</span>
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
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    metaTitle: "Description",
    metaValue:
      "Chris Messina has spent over 15 years  living on the edge of social technology."
  }
};

export default UserDetails;
