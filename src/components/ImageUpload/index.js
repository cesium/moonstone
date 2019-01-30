import React, { Component } from "react";

import FileBase64 from 'react-file-base64';
import axios from 'axios';
import "./index.css";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  fileSelectedHandler = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  fileUploadHandler = file => {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_ATTENDEES
      + this.props.id;
    let data = {
      attendee : {
        avatar: file.base64
      }
    };
    axios
      .post(api_endpoint, data)
      .then(this.props.success)
      .catch(this.props.error);
  }

  render() {
    return (
      <FileBase64 multiple={false} onDone={f => this.fileSelectedHandler(f[0])} />
    );
  }
}

export default ImageUpload;

