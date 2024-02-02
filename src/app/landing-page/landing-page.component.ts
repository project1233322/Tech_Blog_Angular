import { Component,ElementRef,ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../service/auth-service/auth-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor( private authService : AuthServiceService){}
  openSignupModal(): void{
    this.authService.openSignupModal();
  };

  openLoginModal(): void {
    this.authService.openLoginModal();
  };
  
  @ViewChild('aboutUsSection') aboutUsSection!: ElementRef;
  scrollToAboutUs(): void {
    this.aboutUsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
