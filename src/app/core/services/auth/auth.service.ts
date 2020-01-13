import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CartService } from '../cart/cart.service';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../../interfaces/responses';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  token: object;
  user: IUser;

  constructor(
    public router: Router,
    http: HttpClient,
    private cartService: CartService
  ) { super(router, http); }

  register(user: IUser): Observable<AuthResponse> {
    user.orders = this.cartService.orders;

    return this.post(user, '/auth/register')
      .pipe(map((res: AuthResponse) => {
        this.cartService.orders = res.user.orders;
        
        return res;
      }));
  }

  login(email: string, password: string): Observable<any> {
    const orders = this.cartService.orders;

    return this.post({email, password, orders}, '/auth/login')
      .pipe(map((res: AuthResponse) => {
        console.log(res);
        
        this.cartService.orders = res.user.orders;
        
        return res;
      }));
  }

  autoLogin(): void {
    this.getUser();
    this.getToken();
  }

  verifyEmail(key: string): Observable<boolean> {
    return this.post({
      key
    }, '/auth/confirm');
  }

  sendChangePasswordEmail(email: string): Observable<boolean> {
    return this.post({
      email
    }, '/auth/sendForgot');
  }

  sendChangePasswordKey(email: string, key: string): Observable<boolean> {
    return this.post({
      email,
      key
    }, '/auth/checkKey');
  }

  changePassword(email: string, key: string, password: string): Observable<boolean> {
    return this.post({
      email,
      key,
      password
    }, '/auth/changePassword');
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

    if (!user) {
      return null;
    }

    this.user = user;
    return user
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
