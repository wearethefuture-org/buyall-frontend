import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EAuthUrls } from '../../enums/auth.e';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  token: object;
  user: IUser;

  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  register(user: IUser): Observable<IUser> {
    return this.post(user, EAuthUrls.register);
  }

  login(email: string, password: string): Observable<any> {
    return this.post({
      email,
      password
    }, EAuthUrls.login);
  }

  autoLogin(): void {
    this.getUser();
    this.getToken();
  }

  verifyEmail(key: string): Observable<boolean> {
    return this.post({
      key
    }, EAuthUrls.confirmEmail);
  }

  sendChangePasswordEmail(email: string): Observable<boolean> {
    return this.post({
      email
    }, EAuthUrls.sendEmail);
  }

  sendChangePasswordKey(email: string, key: string): Observable<boolean> {
    return this.post({
      email,
      key
    }, EAuthUrls.sendKey);
  }

  changePassword(email: string, key: string, password: string): Observable<boolean> {
    return this.post({
      email,
      key,
      password
    }, EAuthUrls.changePassword);
  }

  isAuth(): boolean {
    return !!this.user && !!this.token;
  }

  setUser(user: IUser): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.user = user;
    }
    return user;
  }

  logOut(): void {
    this.user = null;
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  setToken(token: string): void {
    this.token = {
      timestamp: moment().unix(),
      token: `bearer ${token}`
    };

    localStorage.setItem('token', JSON.stringify(this.token));
  }

  getToken(): string {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      this.token = token;
    }
    return token ? token : '';
  }
}
