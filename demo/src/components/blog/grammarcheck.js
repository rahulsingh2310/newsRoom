import React from "react";
import { Card,CardHeader,CardBody,ListGroup,
    ListGroupItem,
    FormCheckbox,Button,Row,Col } from "shards-react";

class Grammarcheck extends React.Component {

    state = {
        grammar:"Subscribe"
    };
  

  render() {
    return (
        <Card small className="blog-comments sticky-top" style={{top:"170px"}} >
         <CardBody className="p-0">
        <Row>
        <Col className="mt-3">
        <strong className=" ml-3">Are you interested in Grammarcheck ?</strong>
        </Col>
        
        
        </Row>
        <Button className="mt-2 mb-3 ml-3">{this.state.grammar}</Button>
        
        </CardBody>
  </Card>
    );
  }
}

export default Grammarcheck;