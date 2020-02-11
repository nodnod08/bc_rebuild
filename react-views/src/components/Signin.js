import React from 'react';
import './../assets/signin.css'
import axios from 'axios'
import { login } from '../actions/accountActions'
import { connect } from 'react-redux'
import {
    withRouter
  } from 'react-router-dom'

class Signin extends React.Component {
  constructor() {
    super()
    this.state = {
        username: '',
        password: '',
        error: false,
        isLoggedIn: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
        this.setState({
            ...this.state, isLoggedIn: this.props.isLoggedIn
        })
        if(this.props.isLoggedIn) {
        //    return <Redirect to='/' />
        this.props.history.push('/')
        }
    }
  }

  loginAttempt = (event) => {
    event.preventDefault()  
    axios.post('/user/authenticate', {
        username: this.state.username,
        password: this.state.password
    }).then(response => {
        (response.data.success) ? this.props.login(response.data) : this.setState({ ...this.state, error: true })
    })
  }

  input = (event) => {
      this.setState({
          ...this.state, [event.target.name] : event.target.value
      })
  }

  render() {
    return (
    <div className="Signin">
        <div className="row">
            <div className="col-lg-4">
                <form className="signin">
                    <h4>Sign in</h4>
                    <br/>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.input.bind(this)} className="form-control form-control-sm" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.input.bind(this)} className="form-control form-control-sm" placeholder="Password"></input>
                    </div>
                    <button type="submit" onClick={this.loginAttempt} className="btn btn-sm btn-primary submit">Login</button>
                </form>
            </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.account.isLoggedIn
    }
}

export default connect(mapStateToProps, {login})(withRouter(Signin));