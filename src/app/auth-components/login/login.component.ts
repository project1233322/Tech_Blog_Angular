import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { SharedServiceComponent } from '../../shared-service/shared-service.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from '../../service/auth-service/auth-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;     //assignment assertion
  loginStatus!: boolean;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: AuthServiceService,
    private sharedService: SharedServiceComponent,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Login(): void {
    //console.log(this.loginForm.value);

    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);

      //if login successfull execute below code

      this.loginStatus = true;                             //nr 
      this.sharedService.updateStatus(this.loginStatus);   //nr

      this.dialogRef.close();                       //to close the dialog box of signin after successful login
      this.route.navigate(['/user/dashboard']);     //navigate to dashboard on successfull signup

    }, (error: any) => {
      this.snackBar.open("Invalid username or password", 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    })







    // service code to be added
  }
}
