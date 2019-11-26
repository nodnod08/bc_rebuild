import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { AboutComponent } from './components/about/about.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'home', 
    component: LoginComponent 
  }
//   {
//     path: 'about',
//     component: AboutComponent
//   },
//   { path: 'dashboard',
//     component: DashboardComponent
//   }
];
export default appRoutes;