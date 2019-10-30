import React from "react";
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";

import { StickyContainer, Sticky } from 'react-sticky';

export default function Breakingnews() {
  return (
    <Container>

      <Row>
        <Col>
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
