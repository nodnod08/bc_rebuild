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

  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private myAuthService: MyAuthService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
    });
  }

  submitForm() {
    const user = {
      username: this.username,
      password: this.password
    }
    if(this.validateService.validateLogin(user)) {
      this.require = true
    } else {
      this.require = false
      this.myAuthService.loginUser(user).subscribe(data => {
        console.log(data)
      })
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
