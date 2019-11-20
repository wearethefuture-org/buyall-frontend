import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { EUsersUrls } from '../../enums/users.e';
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
    return this.get(EUsersUrls.userList);
  }

  createUser(user: IUser) {
    return this.post(user, EUsersUrls.create);
  }

  editUser(user: IUser, id: number) {
    return this.put(user, EUsersUrls.update + id);
  }

  deleteUser(id: number) {
    return this.delete(EUsersUrls.delete + id);
  }
}
