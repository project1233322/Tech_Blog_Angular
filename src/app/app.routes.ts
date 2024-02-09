import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NoAuthGuard } from './auth-guard/noAuth-guard/no-auth.guard';


export const routes: Routes = [
  {path:'',component:LandingPageComponent, canActivate:[NoAuthGuard]},
  {path:'user',loadChildren:()=> import("./user/user.module").then(m=>m.UserModule)}


];
