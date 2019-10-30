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

export default function Newspost() {
  return (
    <Container>
      <Row>
        <Col>
    <Card>
      {/*<CardHeader>Card header</CardHeader>
      */}

      <CardImg top src="car.jpg" style={{ maxHeight: "330px" }}/>
      <CardBody>
        <CardTitle>News Headline</CardTitle>
        <p>News Description</p>
        <Button>Read more &rarr;</Button>
      </CardBody>

      {/*<CardFooter>Card footer</CardFooter>*/}
    </Card>

    < br></br>
    <Card>
      {/*<CardHeader>Card header</CardHeader>
      */}

      <CardImg top src="car.jpg" style={{ maxHeight: "330px" }}/>
      <CardBody>
        <CardTitle>News Headline</CardTitle>
        <p>News Description</p>
        <Button>Read more &rarr;</Button>
      </CardBody>

      {/*<CardFooter>Card footer</CardFooter>*/}
    </Card>

    </Col>
  </Row>
</Container>
  );
}
