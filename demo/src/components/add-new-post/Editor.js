import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput,Button } from "shards-react";
import Editor from "./editor-quill"
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";


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
    this.props.upload( );
  }

  render() {
    return (
     
      <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post" >
          <FormInput 
          size="lg" 
          className="mb-3" 
          value = {localStorage.getItem('titleUpload')}
          placeholder="Your Post Title" 
          onChange={( event ) => this.handleChange( event)} />
          {/* <ReactQuill className="add-new-post__editor mb-1" /> */}
          <Editor placeholder={'Write something...'}/>
          <br></br><br></br>
          <FormInput type="file" onChange={( event ) => this.handleImage( event)} />
          <Button pill className="mt-4 float-right">Post</Button>
        </Form>
      </CardBody>
    </Card>
    );
  };

}

// const mapDispatchToProps = dispatch => {
//   return {
//       onUpload: (title , body ,) => dispatch( actions.uploadPost( email, password) ),
//       onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//   };
// };

export default Editorbox;
