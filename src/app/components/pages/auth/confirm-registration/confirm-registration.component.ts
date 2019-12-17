import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  subParams: Subscription;
  subVerification: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe((params: any) => {
      const key = params.key;

      this.subVerification = this.authService.verifyEmail(key)
        .subscribe((res: boolean) => {
        });
    });
  }

  ngOnDestroy(): void {
    this.subParams.unsubscribe();
    this.subVerification.unsubscribe();
  }
}
