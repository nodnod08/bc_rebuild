import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MyAuthService } from './../auth/myauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDeactivateService implements CanActivate{

  constructor(
    public auth: MyAuthService,
    public router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    if(this.auth.getUserLoggedIn()) {
      this.router.navigate(['/']);
      return false
    }
    this.router.navigate(['/']);
    return true;
    
  }

}
