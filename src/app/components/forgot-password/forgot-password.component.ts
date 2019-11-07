import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    })
  }

  onChangePasswordSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.valid) {
      const email = this.changePasswordForm.get('email').value;
      this.authService.sendChangePasswordKey(email)
        .subscribe(res => {
          console.log(res);
        }, err => {
          if (err.error.Error === "Bad user email") {
            this.changePasswordForm.get('email').setErrors({badEmail: true})
          }
        })
    }
  }

  get email() {
    return this.changePasswordForm.get('email');
  }
}
