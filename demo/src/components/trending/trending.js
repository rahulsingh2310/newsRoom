import React from "react";
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";


const trending = (props) => (
          <Col lg="3">         
          <Card >
            <CardImg top src="https://c.ndtvimg.com/2019-10/d9qle4k_uddhav-thackeray-devendra-fadnavis-240_240x180_04_October_19.jpg" />
            <CardBody>
              <p>{props.title}</p>
            </CardBody>
          </Card>
          <br></br>
          </Col>
         
)

export default trending;
