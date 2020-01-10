import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { MyAuthService } from '../../services/auth/myauth.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String
  password:String
  private user: SocialUser;
  private loggedIn: boolean;
  require: Boolean
  unauthenticate: Boolean
  loader: Boolean = false


  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private myAuthService: MyAuthService,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    
  }

  submitForm() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.loader = true
    if(this.validateService.validateLogin(user)) {
      this.require = true
    } else {
      this.authenticate(user).then(() => this.loader = false)
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  authenticate(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.require = false
      this.myAuthService.loginUser(user).subscribe(data => {
        if(typeof data.token != 'undefined') {
          localStorage.setItem('user_jwt', data.token)
          localStorage.setItem('user_details', JSON.stringify(data.user))
          this.myAuthService.userCheck()
          this.router.navigate(['/'])
          this.unauthenticate = false
          resolve()
        } else {
          this.unauthenticate = true
          resolve()
        }
      })
    })
  }

}
