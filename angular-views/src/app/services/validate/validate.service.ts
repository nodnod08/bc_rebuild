import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    private http: Http,
  ) { }
  
  validateLogin(user: { username: any; password: any; }) {
    if(user.username == '' || user.username == null || user.password == '' || user.password == null) {
      return true
    }

    return false
  }

  validateRegister(user: { username: any; email: String; firstname: String; lastname: String; password: any; cpassword: String; }, pe, email_already, username_already) {
    if(
      user.username == '' || user.username == null || 
      user.password == '' || user.password == null ||
      user.email == '' || user.email == null ||
      user.firstname == '' || user.firstname == null ||
      user.lastname == '' || user.lastname == null ||
      user.cpassword == '' || user.cpassword == null
      ) {
      return 'required'
    } else if(pe == true || email_already == true || username_already == true) {
      return 'errors'
    }

    return false
  }

  checkEmail(email: { email: String; }) {
    let header = new Headers
    header.append('Content-type', 'application/json')

    return this.http.post('http://localhost:4001/user/email', email, {headers: header})
    .pipe(map((response: any) => response.json()));
  }

  checkUsername(username: { username: String; }) {
    let header = new Headers
    header.append('Content-type', 'application/json')

    return this.http.post('http://localhost:4001/user/username', username, {headers: header})
    .pipe(map((response: any) => response.json()));
  }
}
