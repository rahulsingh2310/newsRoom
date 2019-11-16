import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  Progress
} from "shards-react";


class Categoriesbox extends React.Component {


  render() {
    return (

<Card small className="blog-comments sticky-top" style={{top:"90px",zIndex:"-1"}}>
    <CardHeader className="border-bottom">
      <h6 className="m-0">Categories</h6>
    </CardHeader>

    <CardBody className="p-0"> 
    <Button pill className="mt-3 ml-4" theme="secondary">Politics</Button>
    <Button pill className="mt-3 ml-4" theme="secondary">Technology</Button>
    <Button pill className="mt-3 ml-4 " theme="secondary">Business</Button>
    <Button pill className="mt-3 ml-4" theme="secondary">Entertainment</Button>
    <Button pill className="mt-3 mb-3" style={{marginLeft:"15%"}} theme="secondary">Sports</Button>
    <Button pill className="mt-3 mb-3" style={{marginLeft:"10%"}} theme="secondary">Start-up</Button>
    <Button pill className="mt-3 mb-3" style={{marginLeft:"9%"}} theme="secondary">Country</Button>
    </CardBody>

  </Card>

    );
};

}

export default Categoriesbox;