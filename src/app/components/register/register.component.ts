import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import ConfirmFieldMatchValidator from 'src/app/core/validators/confirm-field-match.validator';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted: boolean;
  emailVerification: boolean = false;
  subRegister: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      lastName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: [null, Validators.compose([Validators.required])],
      dateBirthday: [null, Validators.compose([Validators.required])]
    }, {
      validators: [ConfirmFieldMatchValidator('password', 'confirmPassword')]
    })
  }

  ngOnDestroy() {
    this.subRegister.unsubscribe();
  }

  onRegisterSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.subRegister = this.authService.register(this.registerForm.value)
        .subscribe(res => {
          this.emailVerification = true;
        }, err => {
          if (err.Error = "User already has registered") {
            this.registerForm.get('email').setErrors({emailTaken: true})
          }
        }) 
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get dateBirthday() {
    return this.registerForm.get('dateBirthday');
  }
}
