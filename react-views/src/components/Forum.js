import React from 'react';
import axios from 'axios'
import './../assets/post.css'
import moment from 'moment'
import { withRouter } from "react-router-dom";
// import ReactHtmlParser from 'react-html-parser';


class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      post: []
    }
  }

  componentDidMount() {
    this.getPost()
  }

  // all functions

  getPost = () => {
    
  }

  render() {
    return (
      <div className="Forum">
          <button className="btn btn-sm btn-primary" onClick={ this.props.history.goBack }>go back</button>
      </div>
    )
  }
}

export default withRouter(Forum);