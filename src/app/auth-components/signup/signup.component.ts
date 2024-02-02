import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule,MatSnackBarModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm!: FormGroup;     //assignment assertion

  constructor(
    private fb:FormBuilder,
    private authService : AuthServiceService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private snackBar:MatSnackBar
  ){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator:this.passwordConfirmValidator})
  }

  private passwordConfirmValidator(fg : FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    if(password!=confirmPassword){
      fg.get('confirmPassword')?.setErrors({passwordMismatch:true});
    }else{
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  SignUp():void
  {
    console.log(this.signUpForm.value);
    
    this.authService.signup(this.signUpForm.value).subscribe((response)=>{
      console.log(response);   //display the response from server

      if(response.id!=null)
      {
        this.snackBar.open(
          "You're registered successfully",
          'Close',
          {duration:5000}
        );
        this.dialogRef.close();               //close the signup modal
        this.authService.openLoginModal();    //open the login modal
      } 
      else
      {
        this.snackBar.open(response.message,'Close',{duration:5000});
      }
    }, (error:any)=>{
      this.snackBar.open("Registration failed, Please try again later",'Close',{duration:5000});
    })

  }

}
