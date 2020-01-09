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
  firstname: String
  lastname: String
  fullname: String
  password: String
  cpassword: String
  provider: String
  email_already: Boolean
  username_already: Boolean
  require: Boolean
  pe: Boolean
  success: Boolean
  errors: Boolean
  loader: Boolean = false

  ngOnInit() {
  }

  checkEmail() {
    const email = {
      email: this.email
    }
    this.validateService.checkEmail(email).subscribe(data => {
      if(data.result == null || data.result == '' || data.result == 'null') {
        this.email_already = false
      } else {
        this.email_already = true
      }
      // console.log(data)
    })
  }

  checkUsername() {
    const username = {
      username: this.username
    }
    this.validateService.checkUsername(username).subscribe(data => {
      if(data.result == null || data.result == '' || data.result == 'null') {
        this.username_already = false
      } else {
        this.username_already = true
      }
      // console.log(data)
    })
  }

  registerForm() {
    const user = {
      username: this.username,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      password: this.password,
      cpassword: this.cpassword,
    }
    this.loader = true
    var result = this.validateService.validateRegister(user, this.pe, this.email_already, this.username_already )
    if(result == 'required') {
      this.require = true
    } else if(result == 'errors') {
      this.errors = true
    } else {
      this.errors = false
      this.require = false
      this.myAuthService.registerUser(user).subscribe(data => {
        console.log(data)
        if(data.success) {
          this.success = true
          this.username = ''
          this.email = ''
          this.firstname = ''
          this.lastname = ''
          this.password = ''
          this.cpassword = ''
        } else {
          this.success = false
        }
      })
    }
    this.loader = false
  }

  checkPassword() {
    if(this.password !== this.cpassword) {
      this.pe = true
    } else {
      this.pe = false
    }
  }
}
