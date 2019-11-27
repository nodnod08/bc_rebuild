import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String
  password:String

  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  submitForm() {
    const user = {
      username: this.username,
      password: this.password
    }
    if(this.validateService.validateLogin(user)) {
      this._flashMessagesService.show('Please, complete all the fields', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.authService.loginUser(user).subscribe(data => {
        console.log(data)
      })
    }
  }

}
