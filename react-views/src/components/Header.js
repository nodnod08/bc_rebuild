import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/forums">Forum</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/trendings">Trending</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teams">Teams</Link>
                        </li>
                    </ul>
                    <form className="form-inline mr-auto my-2 my-lg-0">
                    <input className="form-control form-control-sm mr-sm-2" type="text" placeholder="Search"></input>
                    <button className="btn btn-secondary btn-sm my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Create Account</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  );
}

export default Header;