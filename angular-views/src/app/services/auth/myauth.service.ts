import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService
  ) { }

  loginUser(user) {
    let header = new Headers
    header.append('Content-type', 'application/json')

    return this.http.post('http://localhost:4001/user/authenticate', user, {headers: header})
    .pipe(map((response: any) => response.json()));
  }

  registerUser(user) {
    let header = new Headers
    header.append('Content-type', 'application/json')

    return this.http.post('http://localhost:4001/user/register', user, {headers: header})
    .pipe(map((response: any) => response.json()));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('user_jwt');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
