import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  menuToombler: boolean=false
  constructor(
    private authService: AuthService
  ) { }

  onLogOut(): void {
    this.authService.logOut();
  }

  get isAuth(): boolean {
    return this.authService.isAuth();
  }

  get userRole(): string {
    return this.authService.user.role;
  }
  menuTrigger(): void{
    this.menuToombler =! this.menuToombler;
    console.log(this.menuToombler);
  }
}
