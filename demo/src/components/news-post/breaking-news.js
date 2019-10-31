import React from "react";
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";


export default function Breakingnews() {
  return (
    <Container>

      <Row style={{position:"-webkit-fixed",position:"fixed",maxWidth: "250px",top:"112px",right:"50px"}}>
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

    </Container>
  );
}
