import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    })
  }

  onChangePasswordSubmit() {
    this.submitted = true;
  }

  get email() {
    return this.changePasswordForm.get('email');
  }
}
