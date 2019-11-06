import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput,Button } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = () => (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" placeholder="Your Post Title" />
        <ReactQuill className="add-new-post__editor mb-1" />
        <Button pill className="mt-3 float-right">Post</Button>
      </Form>
    </CardBody>
  </Card>
);

export default Editor;
