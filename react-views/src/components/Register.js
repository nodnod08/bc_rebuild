import React from 'react';
import './../assets/register.css'
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios'
import { connect } from 'react-redux'
import {
    withRouter
  } from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator();
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            emailExist: false,
            match: true,
            loading: false,
            success: ''
        };
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.props.history.push('/')
        }
    }

    inputBlur(event) {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
    }

    checkEmail(event) {
        axios.post('/user/email', {
            email: event.target.value
        }).then(response => {
            this.setState({
                ...this.state, emailExist: (response.data.result == null) ? false : true
            })
        })
    }

    checkPass(event) {
        this.setState({
            match: (this.state.password === this.state.confirmPassword) ? true : false
        })
    }

    submit(event) {
        event.preventDefault()
        if (this.validator.allValid() && this.state.match && !this.state.emailExist) {
            this.setState({
                loading: true
            })
            axios.post(`/user/register`, {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                })
                this.setState({
                    success: (response.data.success) ? true : false
                })
            }).then(() => {
                this.setState({
                    ...this.state, loading: false
                })
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="Register">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <form className="signin">
                        <h4>Create your Account</h4>
                        <br/>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" className="form-control form-control-sm" placeholder="Enter email" onChange={this.inputBlur.bind(this)} onBlur={this.checkEmail.bind(this)}></input>
                            <small className="error">{this.validator.message('email', this.state.email, 'required|email')}</small>
                            {this.state.emailExist && <small className="error">Email is already exist.</small>}
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" className="form-control form-control-sm" placeholder="Username" onChange={this.inputBlur.bind(this)}></input>
                            <small className="error">{this.validator.message('username', this.state.username, 'required')}</small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control form-control-sm" placeholder="Password" onChange={this.inputBlur.bind(this)} onBlur={this.checkPass.bind(this)}></input>
                            <small className="error">{this.validator.message('password', this.state.password, 'required|min:8|max:20')}</small>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" className="form-control form-control-sm" placeholder="Confirm Password" onChange={this.inputBlur.bind(this)} onBlur={this.checkPass.bind(this)}></input>
                            <small className="error">{this.validator.message('confirmPassword', this.state.confirmPassword, 'required|min:8|max:20')}</small>
                            {!this.state.match && <small className="error">Password not match.</small>}
                        </div>
                        <div className="form-group">
                            {this.state.loading && <img className="loader" alt="loader" width="50px" height="50px" src={require('./../assets/loader.svg')} />}
                            {(this.state.success && this.state.success !== '') && 
                                <div className="alert alert-dismissible alert-success">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    Successfuly registered you can login now.
                                </div>
                            }
                        </div>
                        <button type="submit" onClick={this.submit.bind(this)} className="btn btn-sm btn-primary submit">Submit</button>
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

export default connect(mapStateToProps, {})(withRouter(Register));