import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { MyAuthService } from '../../services/auth/myauth.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

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
  loader: Boolean = false

  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private myAuthService: MyAuthService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  submitForm() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.loader = true
    setTimeout(() => {
      if(this.validateService.validateLogin(user)) {
        this.require = true
      } else {
        this.require = false
        this.myAuthService.loginUser(user).subscribe(async data => {
          localStorage.setItem('user_jwt', data.token)
          localStorage.setItem('user_username', data.user.username)
        })
      }
      this.loader = false
    }, 1500);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
