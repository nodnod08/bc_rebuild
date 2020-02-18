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
        email: '',
        password: '',
        error: false,
        isLoggedIn: false,
        loading: false,
        message: ''
    };
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
        this.setState({
            ...this.state, isLoggedIn: this.props.isLoggedIn
        })
        if(this.props.isLoggedIn) {
        this.props.history.push('/')
        }
    }
  }

  loginAttempt = (event) => {
    event.preventDefault()
    this.setState({
        ...this.state, loading: true, error: false
    })
    if(this.state.email === '' && this.state.password === '') {
        this.setState({ ...this.state, error: true, message: 'Username or password required.' })
    } else {  
        axios.post('/user/authenticate', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            this.setState({
                ...this.state, loading: false
            })
            if (response.data.success) {  
                this.setState({ ...this.state, error: false })
                let local = JSON.stringify(response.data)
                localStorage.setItem('authenticatedSE', local)
                this.props.login(response.data)
            } else {
                this.setState({ ...this.state, error: true, message: 'Username or password incorrect.' })
            }
        })
    }
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
                        <label>Email</label>
                        <input type="email" name="email" onChange={this.input.bind(this)} className="form-control form-control-sm" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.input.bind(this)} className="form-control form-control-sm" placeholder="Password"></input>
                    </div>
                    {this.state.loading && <img className="loader" alt="loader" width="50px" height="50px" src={require('./../assets/loader.svg')} />}
                    {(this.state.error) && 
                        <div className="alert alert-dismissible alert-danger">
                            { this.state.message }
                        </div>
                    }
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