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
  subGetUserList: Subscription;
  subCreateUser: Subscription;
  subEditUser: Subscription;
  subDeleteUser: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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

    this.subGetUserList = this.userService.getUserList()
      .pipe(
        map((users: IUser[]) => {
          users.map((user: IUser) => {
            user.dateBirthday = moment(user.dateBirthday).format('YYYY-MM-DD');
            return user;
          });
          return users;
        })
      )
      .subscribe((users: IUser[]) => {
        this.users = users;
      });
  }

  onUserDelete(user: IUser): void {
    // delete user when he have forgot and confrim keys on serve
    // add alert user is deleated
    this.subDeleteUser = this.userService.deleteUser(user.id)
      .subscribe((res: boolean) => {
        if (res) {
          this.users = this.users.filter((u: IUser) => {
            return u.id !== user.id;
          }) ;
        }
      });
  }

  onUserCreate(): void {
    // need refactoring if block
    // add alert email is taking
    // add alert user is created
    if (this.createUserForm.valid) {
      this.subCreateUser = this.userService.createUser(this.createUserForm.value)
        .subscribe((user: IUser) => {
          if (user) {
            user.dateBirthday = moment(user.dateBirthday).format('YYYY-MM-DD');
            this.users.push(user);
            this.createUserForm.reset();
          }
        });
    }
  }

  onUserEdit(): void {
    // refactoring 121 line form must contain hidden input with id or something else
    // add alert user is edited
    // add alert user can not be edited because email is taken
    // need refactoring if block
    if (this.editUserForm.valid) {
      this.subEditUser = this.userService.editUser(this.editUserForm.value, this.users[this.editedUserId].id)
        .subscribe((res: boolean) => {
          if (res) {
            this.editUserForm.value.id = this.users[this.editedUserId].id;
            this.users[this.editedUserId] = this.editUserForm.value;
          }
        });
    }
  }

  onInviteEdit(id: number): void {
    // look agly create component user-list-item where manage changes
    this.editedUserId = id;

    // need refactoring
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

  get userRole(): string {
    return this.authService.getUser().role;
  }

  ngOnDestroy(): void {
    if (this.subCreateUser) {
      this.subCreateUser.unsubscribe();
    }

    if (this.subEditUser) {
      this.subEditUser.unsubscribe();
    }

    if (this.subDeleteUser) {
      this.subDeleteUser.unsubscribe();
    }

    if (this.subGetUserList) {
      this.subGetUserList.unsubscribe();
    }
  }
}
