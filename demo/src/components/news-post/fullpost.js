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

class FullNewspost extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
      <Card>
        {/*<CardHeader>Card header</CardHeader>
        */}
  
        <CardImg top src="car.jpg"/>
  
  
        <CardBody>
          <CardTitle>New Nissan 370Z replacement spotted</CardTitle>
          <p>Nissan remains committed to a successor to the existing Nissan 370Z, according to the company’s design boss, and now prototypes of the new sportscar have been spotted at the Nurburgring.</p>
          <p>The current iteration of the iconic Z-car was introduced more than a decade ago - and there has been speculation that it could simply be allowed to die off in the face of ever-tightening regulations on CO2 emissions and fuel efficiency.</p>
          <p>Early prototypes don't give anything away in terms of how the 370Z successor will look, however, speaking at the Tokyo Motor Show, Nissan’s Senior Vice-President for Design, Alfonso Albaisa, said that the company would “never leave this alone”.
  </p>
  <p>
  When asked if he could envisage a successor to the 370Z, Albaisa replied, “It’s easy to imagine. The Z is the car that democratised sports cars back in the sixties. The current car has been a long time in the dealerships, and so you could imagine Giovanni (Arroba, Nissan’s design boss for electric vehicles) and the designers working on it.</p>
      </CardBody>
  
        {/*<CardFooter>Card footer</CardFooter>*/}
      </Card>
  
      < br></br>
  
  
      </Col>
    </Row>
  </Container>
  
  
  )};
}
