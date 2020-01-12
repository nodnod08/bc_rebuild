import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  result:any
  data: any;

  private dataSource = new BehaviorSubject<any>(null);
  user_detail = this.dataSource.asObservable();

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

  checkUserFromSocial(user) {
    let header = new Headers
    header.append('Content-type', 'application/json')

    return this.http.post('http://localhost:4001/user/checkUserFromSocial', user, {headers: header})
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
    if(token == null) {
      return false
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserLoggedIn(): boolean{
    var token_jwt = localStorage.getItem('user_jwt') 
    if(token_jwt == null) {
      return false
    } else {
      const token = {
        token: token_jwt
      }
      let header = new Headers
      header.append('Content-type', 'application/json')

      this.http.post('http://localhost:4001/user/getUser', token, {headers: header})
      .pipe(map(async (response: any) => {
        this.data.push(response.json())
      }));

      return (this.data.length) ? true : false
    }
  }

  userCheck() {
    this.dataSource.next(JSON.parse(localStorage.getItem('user_details')));
  }

  logout() {
    this.dataSource.next(null);
  }
}
