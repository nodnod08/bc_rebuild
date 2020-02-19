import React from 'react';
import './../assets/signin.css'
import axios from 'axios'
import { login } from '../actions/accountActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';

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
            if (response.data.success) {  
                this.setState({ ...this.state, error: false })
                let local = JSON.stringify(response.data)
                localStorage.setItem('authenticatedSE', local)
                this.props.login(response.data)
            } else {
                this.setState({ ...this.state, error: true, message: 'Username or password incorrect.' })
            }
        }).then(() => {
            this.setState({
                ...this.state, loading: false
            })
        })
    }
  }

  input = (event) => {
      this.setState({
          ...this.state, [event.target.name] : event.target.value
      })
  }

  responseGoogle = (response) => {
    this.setState({
        ...this.state, loading: true
    })  
    const user = response.profileObj
    axios.post('/user/checkUserFromSocial', {
        firstname: user.givenName,
        lastname: user.familyName,
        email: user.email,
        img: user.imageUrl,
        googleId: user.googleId
    }).then(response => {
        if (response.data.success) {  
            this.setState({ ...this.state, error: false })
            let local = JSON.stringify(response.data)
            localStorage.setItem('authenticatedSE', local)
            this.props.login(response.data)
        } else {
            this.setState({ ...this.state, error: true, message: 'Something went wrong, please try again.' })
        }
    }).then(() => {
        this.setState({
            ...this.state, loading: false
        })
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
                    <GoogleLogin
                        clientId="547432251334-c7qjf107o1bflg2if54j345uero5st98.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
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