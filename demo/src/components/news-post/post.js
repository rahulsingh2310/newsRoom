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
        <CardTitle>Ayodhya Verdict on Ram Janmabhoomi-Babri Masjid land dispute case 
          </CardTitle>
         
          <span className="float-right" style={{fontSize:"15px"}}>by Pallavi Sareen</span> 
      </CardBody>

      <CardFooter style={{height:"70px"}}>
      <div className="w-100" >

        <div className="mr-5 ml-3 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_up_alt</i>
            <span>10</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_down_alt</i>
            <span>5</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>comment</i>
            <span>5</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>share</i>
            <span>3</span>
        </div>


        <div className="ml-5 float-right">
          <Button tag={Link} to="/news-full-post" >Read more &rarr;</Button>
        </div>
        {/* <div className="float-right">
          <p>by Pallavi Sareen</p>
        </div> */}

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
