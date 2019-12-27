import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  result:any

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

  public async getUserLoggedIn(): Promise<any> {
    const token = {
      token: localStorage.getItem('user_jwt')
    }
    let header = new Headers
    header.append('Content-type', 'application/json')

    await this.http.post('http://localhost:4001/user/getUser', token, {headers: header})
    .pipe(map(async (response: any) => {
      this.result = await response.json()

      console.log(this.result)
      if(this.result.result) {
        return true
      } else {
        return false
      }
    }));
  }
}
