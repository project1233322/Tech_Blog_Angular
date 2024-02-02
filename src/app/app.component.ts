import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { UserModule } from './user/user.module';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LoginComponent } from './auth-components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceComponent } from './shared-service/shared-service.component';
import { HttpClient } from '@angular/common/http';
import { StorageServiceService } from './service/storage-service/storage-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserModule,RouterOutlet,MatSnackBarModule ,MatButtonModule, MatToolbarModule, RouterModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TechBlogV2';

  isUserLoggedIn!: boolean;

  constructor(
    private dialog: MatDialog, 
    private router: Router,
    private snackBar:MatSnackBar
  ) { }

  openSignupModal(): void {
    this.dialog.open(SignupComponent, {
      width: '400px',
      
      // other options...
    });
  }
  openLoginModal(): void{
    this.dialog.open(LoginComponent,{
      width: '400px',
      // other options...
    });
  }
  scrollToAboutUs(): void {
    const aboutUsSection = document.getElementById('aboutUsSection');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  ngOnInit()
  {
    this.updateLoginStatus();
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.updateLoginStatus();
      }
    })
  }
    
  private updateLoginStatus():void{
    this.isUserLoggedIn = StorageServiceService.isUserLoggedIn();
  }

  SignOut():void
  {
    StorageServiceService.logout();
    this.router.navigate(['']);
    this.snackBar.open("Signed Out Successfully",'Close',{duration:5000});
  }
  
}
