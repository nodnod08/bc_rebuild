import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from "angularx-social-login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.authService.authState.subscribe((user) => {
          // console.log(user)
        });
      }
    });
  }

  ngOnInit() {
  }

}
