import { Component, Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-shared-service',
  standalone: true,
  imports: [],
  templateUrl: './shared-service.component.html',
  styleUrl: './shared-service.component.scss'
})

 //to terminate the circular dependency of app component and login component

export class SharedServiceComponent {
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this.isUserLoggedInSubject.asObservable();

  updateStatus(ls: boolean): void {
    this.isUserLoggedInSubject.next(ls);
  }
}
