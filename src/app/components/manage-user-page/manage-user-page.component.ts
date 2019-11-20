import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.css']
})
export class ManageUserPageComponent implements OnInit, OnDestroy {
  users: IUser[];
  createUserForm: FormGroup;
  editUserForm: FormGroup;
  editedUserId: number = undefined;
  subCreateUser: Subscription;
  subEditUser: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      lastName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      dateBirthday: [null, Validators.compose([Validators.required])],
      status: ['pending', Validators.compose([Validators.required])],
      role: ['user', Validators.compose([Validators.required])],
      disabled: [false, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.editUserForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      lastName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      dateBirthday: [null, Validators.compose([Validators.required])],
      status: ['pending', Validators.compose([Validators.required])],
      role: ['user', Validators.compose([Validators.required])],
      disabled: [false, Validators.compose([Validators.required])]
    });
    
    this.userService.getUserList()
      .pipe(
        map((users: IUser[]) => {
          users.map((user: IUser) => {
            user.dateBirthday = moment(user.dateBirthday).format("YYYY-MM-DD");
            return user;
          })
          return users
        })
      )
      .subscribe((users: IUser[]) => {
        this.users = users;
      })
  }

  ngOnDestroy() {
    if (this.subCreateUser) {
      this.subCreateUser.unsubscribe();
    }

    if (this.subEditUser) {
      this.subEditUser.unsubscribe();
    }
  }

  onUserDelete(user: IUser) {
    this.userService.deleteUser(user.id)
      .subscribe(res => {
        if (res) {
          this.users = this.users.filter(u => {
            return u.id != user.id;
          }) 
        }
      })
  }

  onUserCreate() {
    if (this.createUserForm.valid) {
      this.userService.createUser(this.createUserForm.value) 
        .subscribe(user => {
          if (user) {
            user.dateBirthday = moment(user.dateBirthday).format("YYYY-MM-DD");
            this.users.push(user);
            this.createUserForm.reset();
          }
        })
    }
  }

  onUserEdit() {
    this.userService.editUser(this.editUserForm.value, this.users[this.editedUserId].id)
      .subscribe(res => {
        if (res) {
          this.editUserForm.value.id = this.users[this.editedUserId].id;
          this.users[this.editedUserId] = this.editUserForm.value;
        }
      });
  }

  onInviteEdit(id: number) {
    this.editedUserId = id;

    const {
      firstName,
      lastName,
      email,
      role,
      status,
      disabled,
      dateBirthday
    } = this.users[id];

    this.editUserForm.setValue({
      firstName,
      lastName,
      email,
      role,
      status,
      disabled,
      dateBirthday
    });
  }

  get userRole() {
    return this.authService.getUser().role;
  }
}
