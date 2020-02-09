import React from 'react';
import './../assets/signin.css'

function Signin() {
  return (
    <div className="Signin">
        <div className="row">
            <div className="col-lg-4">
                <form className="signin">
                    <h4>Sign in</h4>
                    <br/>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="Password"></input>
                    </div>
                    <button type="submit" class="btn btn-sm btn-primary submit">Login</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Signin;