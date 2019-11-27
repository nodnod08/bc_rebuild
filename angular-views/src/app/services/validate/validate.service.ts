import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  
  validateLogin(user) {
    if(user.username == '' || user.username == null || user.password == '' || user.password == null) {
      return true
    }

    return false
  }
}
