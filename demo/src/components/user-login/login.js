import React from "react";
import {
    Container,Card,
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

const Login = () => (
    <Card style={{ maxWidth: "300px" }}>
      <CardHeader>Card header</CardHeader>
      
      <CardBody>
        <CardTitle>Lorem Ipsum</CardTitle>
        <strong className="text-muted d-block mb-2">Forms</strong> <Form> <FormGroup> <InputGroup className="mb-3"> <InputGroupAddon type="prepend"> <InputGroupText>@</InputGroupText> </InputGroupAddon> <FormInput placeholder="Username" /> </InputGroup> </FormGroup> <FormGroup> <FormInput type="password" placeholder="Password" value="myCoolPassword" onChange={() => {}} /> </FormGroup> </Form>
        <Button>Login</Button>
      </CardBody>
      <CardFooter>Card footer</CardFooter>
    </Card>
);

export default Login;
