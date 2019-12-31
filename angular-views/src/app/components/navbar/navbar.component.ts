import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { MyAuthService } from "../../services/auth/myauth.service";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: any;
  username: string;
  faCoffee = faUserCircle;
  faCogs = faCogs;
  faReceipt = faReceipt;
  faSignOutAlt = faSignOutAlt;
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
    this.username = localStorage.getItem('user_username') 
  }

  logOut() {
    localStorage.removeItem("user_jwt");
    localStorage.removeItem("user_username");
    window.location.pathname = '/'
  }
}
