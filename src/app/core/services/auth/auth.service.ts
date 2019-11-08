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

  register(user: IUser): Observable<IUser> {
    const url = this.apiUrl + EAuthUrls.register;
    return this.http.post<IUser>(url, user);
  }

  login(email: string, password: string): Observable<IUser> {
    const url = this.apiUrl + EAuthUrls.login;
    return this.http.post<IUser>(url, {
      email,
      password
    });
  }

  autoLogin(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  verifyEmail(key: string): Observable<boolean> {
    const url = this.apiUrl + EAuthUrls.confirmEmail;
    return this.http.post<boolean>(url, {key});
  }

  sendChangePasswordEmail(email: string): Observable<boolean> {
    const url = this.apiUrl + EAuthUrls.sendEmail;
    return this.http.post<boolean>(url, {email});
  }

  sendChangePasswordKey(email: string, key: string): Observable<boolean> {
    const url = this.apiUrl + EAuthUrls.sendKey;
    return this.http.post<boolean>(url, {
      email,
      key
    });
  }

  changePassword(email: string, key: string, password: string): Observable<boolean> {
    const url = this.apiUrl + EAuthUrls.changePassword;
    return this.http.post<boolean>(url, {
      email,
      key,
      password
    });
  }

  isAuth(): boolean {
    return !!this.user;
  }

  setUser(user: IUser): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logOut(): void {
    this.user = null;
    localStorage.removeItem('user');
  }
}
