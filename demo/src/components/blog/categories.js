import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Badge,
  Row,
  Col,
  Progress
} from "shards-react";


class Categoriesbox extends React.Component {
  state = {
    redirect :""
  }

  goToPost = (Id) =>{
    console.log(Id);
    this.setState({redirect:Id})
    
  };

  render() {
    const {redirect} = this.state;
    if (redirect){
      return <Redirect to={{
        pathname: `/news/${this.state.redirect}`,
    }}
/> ;
  } 
    return (

<Card small className="blog-comments sticky-top" style={{top:"90px"}}>
    <CardHeader className="border-bottom">
      <h6 className="m-0">Categories</h6>
    </CardHeader>

    <CardBody className="p-0"> 
    
    <Button pill onClick={() => this.goToPost('Politics')} className="mt-3 ml-2" theme="secondary" value="Politics">Politics</Button>
    <Button pill className="mt-3 ml-2" theme="secondary" value="Technology" onClick={() => this.goToPost('technology')}>Technology</Button>
    <Button pill className="mt-3 ml-2 " theme="secondary" value="Business" onClick={() => this.goToPost('business')}>Business</Button>
   
    <Button onClick={() => this.goToPost('sports')} value="Sports" pill className="mt-3 ml-2"theme="secondary">Sports</Button>
    <Button pill className="mt-3 mb-3" style={{marginLeft:"9%"}} value="India" theme="secondary" onClick={() => this.goToPost('india')}>India</Button>
    <Button pill className="mt-3 mb-3" style={{marginLeft:"3%"}} value="Entertainment" theme="secondary" onClick={() => this.goToPost('entertainment')}>Entertainment</Button>
    <Button pill className="mt-3 mb-3" style={{marginLeft:"3%"}} value="International" theme="secondary" onClick={() => this.goToPost('international')}>International</Button>
    
    </CardBody>

  </Card>

    );
};

}

export default Categoriesbox;