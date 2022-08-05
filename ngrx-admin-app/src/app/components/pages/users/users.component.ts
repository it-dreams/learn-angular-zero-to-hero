import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { IUser } from '../../../modal/user';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../../store/actions/user.actions';
import * as fromUser from '../../../store/selector/user.selectors';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, AfterViewInit {
  pageTitle = 'Users List';
  errorMessage = '';
  users: IUser[];
  userFilter = '';

  @ViewChild('divElementVar') divElementRef: ElementRef;

  constructor(
    private store: Store,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.divElementRef.nativeElement.focus();
  }

  ngOnInit(): void {
    this.store.dispatch(new UserActions.LoadUsers());

    this.store.pipe(select(fromUser.getUsers)).subscribe((users) => {
      this.users = users;
    });

    this.store.pipe(select(fromUser.getError)).subscribe((err) => {
      this.errorMessage = err;
    });
  }

  deleteButton(id) {
    const remove = window.confirm('Are you sure you want to remove this user?');
    if (remove) {
      this.store.dispatch(new UserActions.DeleteUser({ id }));
    }
  }

  editButton(user: IUser) {
    this.dialog.open(UpdateUserComponent, {
      width: '60%',
      data: {
        name: user.name,
        gender: user.gender,
        email: user.email,
        company: user.company,
        age: user.age,
      },
    });
  }
}
