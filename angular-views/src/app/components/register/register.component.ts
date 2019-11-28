import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MyAuthService } from '../../services/auth/myauth.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private myAuthService: MyAuthService,
  ) { }

  email: String
  username: String
  firtname: String
  lastname: String
  fullname: String
  password: String
  cpassword: String
  provider: String
  email_already: Boolean
  username_already: Boolean

  ngOnInit() {
  }

  registerForm() {
    console.log(this.email)
  }

  checkEmail(event) {
    const email = {
      email: this.email
    }

    // if(this.validateService.checkEmail(email)) {
    //   console.log(this.validateService.checkEmail(email))
    //   this._flashMessagesService.show('Email is already exist', { cssClass: 'alert-danger', timeout: 4000 });
    //   this.email_already = true
    // } else {
    //   this.email_already = true
    // }
    this.validateService.checkEmail(email).subscribe(data => {
      if(data.result == null || data.result == '' || data.result == 'null') {
        this.email_already = false
      } else {
        this._flashMessagesService.show('Email is already exist', { cssClass: 'alert-danger', timeout: 100000 });
        this.email_already = true
      }
    })
  }
}
