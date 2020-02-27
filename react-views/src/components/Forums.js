import React from 'react';
import axios from 'axios'
import './../assets/post.css'
import moment from 'moment'
import { NavLink } from "react-router-dom";
// import ReactHtmlParser from 'react-html-parser';


class Forums extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  // all functions

  getPosts = () => {
    axios.get('/post/getAllPosts').then(response => {
      console.log(response.data.result)
      this.setState({
        ...this.state, posts: response.data.result
      })
    })
  }

  render() {
    return (
      <div className="Header">
          <div className="container">
            <div className="row">
            {this.state.posts.map((value, index) => {
              return <div key={index} className="post col-lg-12">
                <h4 className="title">{ value.title }</h4>
                <small>posted by: <b>{ value.user.fullname }</b> on <b>{moment(value.date).format("LL") }</b> at <b> { moment(value.date).format("hh:mm a") }</b></small>
                <br/>
                <p>file(s) included <b>{ value.files.length }</b></p>
                <small><i className="fa fa-thumbs-up"></i> { value.likes } <i className="fa fa-thumbs-down"></i> { value.dislikes }</small>
              </div>
            })}
            </div>
          </div>
      </div>
    )
  }
}

export default Forums;