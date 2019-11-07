import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EAuthUrls } from '../../enums/auth.e';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  user: IUser;

  constructor(
    private http: HttpClient
  ) { super(); }

  register(user: IUser): Observable<any> {
    const url = this.apiUrl + EAuthUrls.register;
    return this.http.post(url, user);
  }

  login(email: string, password: string) {
    const body = {
      email,
      password
    };

    const url = this.apiUrl + EAuthUrls.login;
    return this.http.post(url, body);
  }

  verifyEmail(key: string) {
    const url = this.apiUrl + EAuthUrls.confirmEmail;
    return this.http.post(url, {key});
  }

  isAuth() {
    return !!this.user;
  }

  setUser(user: IUser) {
    this.user = user; 
  }
}
