import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editorbox from "../components/add-new-post/Editor";
/*import SidebarActions from "../components/add-new-post/SidebarActions";*/

import SidebarCategories from "../components/add-new-post/SidebarCategories";

import FormCheckboxExample from "../components/add-new-post/sideCategories";


const AddNewPost = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Post" subtitle="News Posts" className="text-sm-left" />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg={{ size: 10, offset: 1 }} md="12">
        <Editorbox />
      </Col>

    </Row>
  </Container>
);

export default AddNewPost;
