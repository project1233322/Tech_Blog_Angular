import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../../auth-components/signup/signup.component';
import { LoginComponent } from '../../auth-components/login/login.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { StorageServiceService } from '../storage-service/storage-service.service';


const COMMON_URL = ['http://localhost:8080/']
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService 
{

  constructor
  (
    private dialog: MatDialog,
    private http: HttpClient,
    private storage: StorageServiceService
  ){ }

  openSignupModal(): void 
  {
    this.dialog.open(SignupComponent, {
      width: '400px',
      panelClass: 'my-dialog-container-class'
      // position: { top: '50%', left: '50%' },
      // panelClass: 'signup-modal-container', // Add a custom CSS class
      // backdropClass: 'signup-modal-backdrop', // Add a custom CSS class for the backdrop
    }); 
  }

  openLoginModal(): MatDialogRef<LoginComponent> 
  {
    return this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }

  //send request to signup API
  signup(signUpData:any):Observable<any>
  {
    return this.http.post(COMMON_URL+"signup",signUpData);
  }

  login(loginData:any):Observable<any>
  {
    return this.http.post(COMMON_URL+"authentication",loginData,
    {observe:'response'}).pipe(
      tap(__=>this.log("User Authentication")),
      map((res: HttpResponse<any>)=>{
        this.storage.saveUser(res.body);
        const tokenLength = res.headers.get(AUTH_HEADER)?.length;
        const bearerToken = (res.headers.get(AUTH_HEADER) as String).substring(7,tokenLength);
        this.storage.saveToken(bearerToken);
        return res;
      })
    );
  }

  log(message:string):void{
    console.log("User Auth Service" + message);
  }
}
