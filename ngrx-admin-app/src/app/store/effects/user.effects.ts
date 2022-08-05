import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadUsers),
    mergeMap((action) =>
      this.userService.getUsers().pipe(
        map((users) => new userActions.LoadUsersSuccess({ data: users })),
        catchError((err) =>
          of(new userActions.LoadUsersFailure({ error: err }))
        )
      )
    )
  );

  @Effect()
  CreateUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.CreateUser),
    mergeMap((payload) =>
      this.userService.createUser(payload)
      .pipe(map(() => new userActions.CreateUserSuccess(payload))
      )
    )
  );

  @Effect()
  UpdateUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.UpdateUser),
    mergeMap((payload) =>
      this.userService.updateUser(payload)
      .pipe(map(() => new userActions.UpdateUserSuccess(payload))
      )
    )
  );

  @Effect()
  DeleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteUser),
    mergeMap(({payload}) => {
      console.log(payload);
      return this.userService
        .deleteUser(payload['id'])
        .pipe(map(() => new userActions.DeleteUserSuccess(payload['id'])))
    })
  );
}
