import React from "react";
import ReactQuill from "react-quill";
import { Card, Row,Col,CardBody, Form, FormInput,Button } from "shards-react";
import Editor from "./editor-quill"
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { generateBase64FromImage } from '../../utils/images';

import FormCheckboxExample from "./sideCategories";


class Editorbox extends React.Component {
  state ={
    title: "",
    image : "",
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
    localStorage.setItem("titleUpload", e.target.value);
  }

  handleImage(e) {
    this.setState({ image: e.target.file });
    // localStorage.setItem("image", e.target.file);
    
  }

  submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onUpload( localStorage.getItem('titleUpload') 
    , localStorage.getItem('bodyUpload') , this.state.image, localStorage.getItem('tags')  );
  }

  

  render() {
    return (
     
      <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post" onSubmit={this.submitHandler} >
          <FormInput 
          size="lg" 
          className="mb-3" 
          value = {localStorage.getItem('titleUpload')}
          placeholder="Your Post Title" 
          onChange={( event ) => this.handleChange( event)} />
          {/* <ReactQuill className="add-new-post__editor mb-1" /> */}
          <Editor placeholder={'Write something...'}/>
          <br></br><br></br>
          
          <FormCheckboxExample />
          <Row>
            <Col>
          <FormInput type="file" onChange={( event ) => this.handleImage( event)} />
          </Col><Col>
          <Button pill className="float-right">Post</Button>
          </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
    );
  };

}

const mapDispatchToProps = dispatch => {
  return {
      onUpload: (title,body,image,tags) => dispatch( actions.uploadPost(title,body,image,tags) ),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default withRouter(connect(null, mapDispatchToProps )(Editorbox));