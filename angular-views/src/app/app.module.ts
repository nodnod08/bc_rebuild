import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MyAuthService } from './services/auth/myauth.service';
import { HttpModule } from '@angular/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
import { 
  AuthRouteService
} from './services/auth-route/auth-route.service';
import { JwtModule } from "@auth0/angular-jwt";
import { AngularSvgIconModule } from 'angular-svg-icon';


import { AppComponent } from './app.component';
import { ValidateService } from './services/validate/validate.service'
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { ShopComponent } from './components/shop/shop.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
  { path: '', 
    component: IndexComponent 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'about',
    component: AboutComponent
  },
  { path: 'shop',
    component: ShopComponent,
    // canActivate: [AuthRouteService]
  }
];

export function tokenGetter() {
  return localStorage.getItem("user_jwt");
}

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("547432251334-c7qjf107o1bflg2if54j345uero5st98.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    ShopComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:4200"],
        blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    }),
    AngularSvgIconModule 
  ],
  providers: [
    ValidateService,
    AuthRouteService,
    MyAuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
