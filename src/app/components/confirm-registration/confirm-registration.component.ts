import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  subParams: Subscription;
  subVerification: Subscription;
  loadding: boolean = true;
  verified: boolean;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.isAuth()) {
      this.router.navigate(['auth', 'login']);
    }

    this.subParams = this.route.params.subscribe(params => {
      const key = params['key'];

      this.subVerification = this.authService.verifyEmail(key)
        .subscribe(res => {
          console.log(res)
          this.loadding = false;
          if (res) {
            this.verified = true;
          } 
        }, err => {
          if (err = 'User has already confirmed mail') {
            this.loadding = false;
            this.verified = false;
          }
        })
    })
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subVerification.unsubscribe();
  }
}
