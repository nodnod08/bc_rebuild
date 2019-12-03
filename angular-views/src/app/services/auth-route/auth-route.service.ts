import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MyAuthService } from './../auth/myauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteService implements CanActivate{
  
  result: Boolean
  resultF: Boolean

  constructor(
    public auth: MyAuthService,
    public router: Router
  ) { }

  // canActivate(): boolean {
  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }

  async canActivate(): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    } else {
      // const result = await this.auth.getUserLoggedIn().subscribe()

      // await result.then((data: any) => {
      //   if(data) {
      //     return true
      //   }
      //   this.router.navigate(['login']);
      //   return false;
      // })
      await this.auth.getUserLoggedIn().subscribe(data => {
        console.log(data.result)
      })
      
      console.log('last run')
    }
  }

  // isUser(): Object {
  //   this.auth.getUserLoggedIn().subscribe(data => {
  //     this.result = data
  //   })

  //   return this.result
  // }
}
