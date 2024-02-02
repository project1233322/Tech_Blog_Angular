import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


export const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'user',loadChildren:()=> import("./user/user.module").then(m=>m.UserModule)}


];
