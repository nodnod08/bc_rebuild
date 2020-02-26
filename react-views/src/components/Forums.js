import React from 'react';
import axios from 'axios'

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

  // all functions

  getPosts = () => {
    axios.get('/post/getAllPosts').then(response => {
      console.log(response)
      this.setState({
        ...this.state, posts: response
      })
    })
  }

  render() {
    return (
      <div className="Header">
          <div className="container">
            <div className="row">

            </div>
          </div>
      </div>
    )
  }
}

export default Forums;