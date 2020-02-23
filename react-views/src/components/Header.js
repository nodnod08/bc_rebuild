import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import { reload, logout } from '../actions/accountActions'
import {
    withRouter
  } from 'react-router-dom'
import Avatar from 'react-avatar';  
import MicroModal from 'micromodal';
import "./../assets/micromodal.css";
import CKEditor from 'ckeditor4-react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';

class Header extends React.Component{
  constructor() {
    super()
    this.state = {
        isLoggedIn: false,
        user: {},
        ready: false,
        addPostModal: false,
        ckData: '',
        fileItems: []
    };
  }  

  componentDidMount() {
    this.props.reload()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
        this.setState({
            ...this.state, isLoggedIn: this.props.isLoggedIn, user: this.props.user
        })
        if(!this.props.isLoggedIn) {
            this.props.history.push('/')
        }
    }

    if (this.props.location !== prevProps.location) {
        this.props.reload()
        if(window.innerWidth < 992) {
            document.querySelector('.removable').classList.remove('show')
        }
    }
  }  

  getData( changeEvent ) {
    this.setState({
        ...this.state, ckData: changeEvent.editor.getData()
    })
  }

  filing(fileItems) {
    this.setState({
        ...this.state, files: fileItems
    })
  }

  postNow = () => {
      console.log(this.state.ckData)
      axios.post('/post/insert', {
          fileItems: this.state.fileItems
      })
  }

  logout = () => {
    this.props.logout()
    localStorage.removeItem('authenticatedSE')
  }

  render() {
    return (
        <div className="Header">
            <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
                <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
                <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                    <header className="modal__header">
                    <h2 className="modal__title" id="modal-1-title">
                        Create your Post
                    </h2>
                    <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
                    </header>
                    <main className="modal__content" id="modal-1-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <div className="form-group">
                                    <label>Post Title</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Place your Title here..."/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <CKEditor
                                        onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                        type="classic"
                                        onChange={ this.getData.bind(this) }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Add Files (optional)</label><br/>
                                    <FilePond allowMultiple={true} maxFiles={5} name="files" className="files" onupdatefiles={this.filing.bind(this)}></FilePond>
                                </div>
                                <div className="form-group">
                                    <button type="button" onClick={ this.postNow } className="btn btn-success btn-sm">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </main>
                </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img width="50px" height="50px" src={require('./../assets/logo.png')}/></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse removable" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/forums">Forum</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trendings">Trending</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                            </li>
                        </ul>
                        <form className="form-inline mr-auto my-2 my-lg-0">
                        <input className="form-control form-control-sm mr-sm-2" type="text" placeholder="Search"></input>
                        <button className="btn btn-secondary btn-sm my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        { (!this.state.isLoggedIn) && 
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">Sign in</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Create Account</NavLink>
                            </li>
                        </ul>
                        }
                        { (this.state.isLoggedIn) && 
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    { (this.state.user.processFrom == 'default') && 
                                        <a style={{cursor: "pointer"}} className="nav-link usernameToggle dropdown-toggle" data-toggle="dropdown" id="download" aria-expanded="true">
                                        { this.state.user.username }
                                        <span className="caret"></span></a>
                                    }
                                    { (this.state.user.processFrom == 'social') && 
                                        <a style={{cursor: "pointer"}} className="nav-link usernameToggle" data-toggle="dropdown" id="download" aria-expanded="true">
                                        <Avatar size="23" round={true} name={ this.state.user.firstname+" "+ this.state.user.lastname } src={this.state.user.img} /></a>    
                                    }
                                    <div className="dropdown-menu" aria-labelledby="download">
                                        <button className="dropdown-item"><i className="fa fa-cogs"></i> Settings</button>
                                        <button className="dropdown-item" type="button"><i className="fa fa-clipboard"></i> My Post(s)</button>
                                        <button className="dropdown-item" onClick={() => MicroModal.show("modal-1")} type="button"><i className="fa fa-plus"></i> Create Post</button>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={this.props.logout} type="button"><i className="fa fa-sign-out-alt"></i> Logout</button>
                                    </div>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user
    }
}

export default connect(mapStateToProps, {reload, logout})(withRouter(Header));