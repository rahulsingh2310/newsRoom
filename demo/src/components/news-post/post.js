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



const posts = (props) => (
    <Container>
      <Row>
        <Col>
    <Card>
      <CardImg top src="car.jpg" style={{ maxHeight: "330px" }}/>
      <CardBody className="border-bottom">
        <CardTitle>{props.title}
          </CardTitle>
         
          <span className="float-right" style={{fontSize:"15px"}}>{props.user}</span> 
      </CardBody>

      <CardFooter style={{height:"70px"}}>
      <div className="w-100" >

        <div className="mr-5 ml-3 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_up_alt</i>
            <span>{props.likes}</span>
        </div>

        <div className="mr-5 float-left">
            <i class="material-icons" style={{fontSize:"30px"}}>thumb_down_alt</i>
            <span>{props.dislike}</span>
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

    </div>
  </CardFooter>
      </Card>
      <br></br>
      </Col>
    </Row>
  </Container>
);



export default posts;



