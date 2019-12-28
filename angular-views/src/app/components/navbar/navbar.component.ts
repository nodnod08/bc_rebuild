import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { MyAuthService } from "../../services/auth/myauth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private MyAuthService: MyAuthService
    ) {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.authService.authState.subscribe((user) => {
          console.log(user)
        });
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.MyAuthService.isAuthenticated()
  }

}
