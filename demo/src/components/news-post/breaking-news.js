import React from "react";
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";


export default function Breakingnews() {
  return (

      <Card style={{position:"-webkit-fixed",position:"fixed",maxWidth: "212px",top:"112px"}}>
      <Row >
        <Col >
          <Card>
            <CardImg top src="https://place-hold.it/300x200" />
            <CardBody>
              <p>News 1 Headline</p>
            </CardBody>
          </Card>
          <br></br>
          <Card>
          <CardImg top src="https://place-hold.it/300x200" />
            <CardBody>
              <p>News 2 Headline</p>
            </CardBody>

          </Card>
        </Col>
      </Row>
        </Card>

  );
}
