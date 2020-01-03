import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subUploadImage$: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onUpload(target: HTMLInputElement) {
    const { id } = this.authService.getUser();

    const body = new FormData();
    body.append('file', target.files[0]);

    this.userService.uploadImage(body, id)
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnDestroy() {
    if (this.subUploadImage$) { this.subUploadImage$.unsubscribe(); }
  }
}
