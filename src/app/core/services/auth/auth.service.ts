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
    const url = this.apiUrl + EAuthUrls.login;
    return this.http.post(url, {
      email,
      password
    });
  }

  autoLogin() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  verifyEmail(key: string) {
    const url = this.apiUrl + EAuthUrls.confirmEmail;
    return this.http.post(url, {key});
  }

  sendChangePasswordEmail(email: string) {
    const url = this.apiUrl + EAuthUrls.sendEmail;
    return this.http.post(url, {email});
  }

  sendChangePasswordKey(email: string, key: string) {
    const url = this.apiUrl + EAuthUrls.sendKey;
    return this.http.post(url, {
      email,
      key
    });
  }

  changePassword(email: string, key: string, password: string) {
    const url = this.apiUrl + EAuthUrls.changePassword;
    return this.http.post(url, {
      email,
      key,
      password
    });
  }

  isAuth() {
    return !!this.user;
  }

  setUser(user: IUser) {
    this.user = user; 
    localStorage.setItem('user', JSON.stringify(user));
  }

  logOut() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
