import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  getUserList(): Observable<IUser[]> {
    return this.get('/users');
  }

  createUser(user: IUser): Observable<IUser> {
    return this.post(user, '/user/');
  }

  editUser(user: IUser, id: number): Observable<boolean> {
    return this.put(user, `/user/${id}`);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.delete(`/user/${id}`);
  }
}
