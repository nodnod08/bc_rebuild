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
  
  validateLogin(user) {
    if(user.username == '' || user.username == null || user.password == '' || user.password == null) {
      return true
    }

    return false
  }

  checkEmail(email) {
    let header = new Headers
    header.append('Content-type', 'application/json')

    return this.http.post('http://localhost:4001/user/email', email, {headers: header})
    .pipe(map((response: any) => response.json()));
  }
}
