import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EForgotPasswordStages } from 'src/app/core/enums/forgot-password-stages.e';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  sendEmailForm: FormGroup;
  sendKeyForm: FormGroup;
  sendPasswordForm: FormGroup;
  subEmail: Subscription;
  subKey: Subscription;
  subPassword: Subscription;
  submitted: boolean;
  stage: number = this.sendEmailStage;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sendEmailForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });

    this.sendKeyForm = this.fb.group({
      key: [null, Validators.compose([Validators.required])]
    });

    this.sendPasswordForm = this.fb.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnDestroy(): void {
    if (this.subEmail) {
      this.subEmail.unsubscribe();
    }
    if (this.subKey) {
      this.subKey.unsubscribe();
    }
    if (this.subPassword) {
      this.subPassword.unsubscribe();
    }
  }

  onSendEmail(): void {
    this.submitted = true;

    if (this.sendEmailForm.valid) {
      this.subEmail = this.authService.sendChangePasswordEmail(this.email.value)
        .subscribe((res: boolean) => {
          this.stage = this.sendKeyStage;
          this.submitted = false;
        }, (err: any) => {
          if (err.error === 'Email is unregistered') {
            this.email.setErrors({badEmail: true});
          }
        });
    }
  }

  onSendKey(): void {
    this.submitted = true;

    if (this.sendKeyForm.valid) {
      this.subKey = this.authService.sendChangePasswordKey(this.email.value, this.key.value)
        .subscribe((res: boolean) => {
          if (res) {
            this.stage = this.changePasswordStage;
            this.submitted = false;
          } else {
            this.key.setErrors({badKey: true});
          }
        });
    }
  }

  onSendPassword(): void {
    this.submitted = true;

    this.subPassword = this.authService.changePassword(this.email.value, this.key.value, this.password.value)
      .subscribe((res: boolean) => {
        if (res) {
          this.router.navigate(['auth', 'login']);
        }
      });
  }

  get email(): AbstractControl {
    return this.sendEmailForm.get('email');
  }

  get key(): AbstractControl {
    return this.sendKeyForm.get('key');
  }

  get password(): AbstractControl {
    return this.sendPasswordForm.get('password');
  }

  get sendEmailStage(): EForgotPasswordStages {
    return EForgotPasswordStages.sendEmail;
  }

  get sendKeyStage(): EForgotPasswordStages {
    return EForgotPasswordStages.sendKey;
  }

  get changePasswordStage(): EForgotPasswordStages {
    return EForgotPasswordStages.changePassword;
  }
}
