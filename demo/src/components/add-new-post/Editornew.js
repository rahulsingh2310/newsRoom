import React from "react";
import { FormTextarea } from "shards-react";

class BasicFormTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: null };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    localStorage.setItem("bodyUpload", this.state.value);
  }


  componentDidMount = () =>{
    this.setState({ editorHtml : localStorage.getItem("bodyUpload")});
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <FormTextarea style={{height:"310px"}} placeholder="Write Something..." onChange={this.handleChange} />
      </div>
    );
  }
}

export default BasicFormTextarea;