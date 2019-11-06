import React from "react";
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
export default function Newspost() {
  return (
    <Container>
      <Row>
        <Col>
    <Card>
      {/*<CardHeader>Card header</CardHeader>
      */}

      <CardImg top src="car.jpg" style={{ maxHeight: "330px" }}/>
      <CardBody className="border-bottom">
        <CardTitle>News Headline</CardTitle>
        <p>News Description</p>

      
      </CardBody>

      <CardFooter>
      <div className="w-100">

        <div className="mr-5 ml-3 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>favorite_border</i>

        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>comment</i>

        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>share</i>
        </div>
        <div className="ml-5 float-right">
          <Button tag={Link} to="/news-full-post" >Read more &rarr;</Button>
        </div>

  </div>
</CardFooter>
    </Card>

    < br></br>
    <Card>
      {/*<CardHeader>Card header</CardHeader>
      */}

      <CardImg top src="sea.jpg" style={{ maxHeight: "330px" }}/>
      <CardBody>
        <CardTitle>News Headline</CardTitle>
        <p>News Description</p>
        <Button>Read more &rarr;</Button>
      </CardBody>



    </Card>

    </Col>
  </Row>
</Container>
  );
}
