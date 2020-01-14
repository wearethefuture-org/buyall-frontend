import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subUpdateUser$: Subscription;
  form: FormGroup;
  user: IUser;
  @ViewChild("img", {static: false}) img: ElementRef;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    if (!this.user.img) {
      this.user.img = {url: './assets/empty.png'};
    }

    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.compose([Validators.required, Validators.maxLength(255)])],
      lastName: [this.user.lastName, Validators.compose([Validators.required, Validators.maxLength(255)])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      file: [null]
    });
  }

  onUpload(target: HTMLInputElement) {
    const reader = new FileReader();

    const file = target.files[0];

    this.form.patchValue({file});

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.img.nativeElement.src = reader.result;
    };
  }

  onUpdate() {
    const body = new FormData();

    body.append('firstName', this.form.get('firstName').value);
    body.append('lastName', this.form.get('lastName').value);
    body.append('file', this.form.get('file').value);

    this.userService.editUser(body, this.user.id)
      .subscribe((user: IUser) => {
        this.authService.setUser(user);
      });
  }

  ngOnDestroy() {
    if (this.subUpdateUser$) { this.subUpdateUser$.unsubscribe(); }
  }
}
