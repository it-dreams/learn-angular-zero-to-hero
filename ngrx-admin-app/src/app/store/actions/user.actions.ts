import { Action } from '@ngrx/store';
import { IUser } from '../../modal/user';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',

  CreateUser = '[User] Create User',
  CreateUserSuccess = '[User] Create User Success',

  UpdateUser = '[User] Update User',
  UpdateUserSuccess = '[User] Update User Success',

  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] Delete User Success',
}

// get all user
export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}
export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: { data: IUser[] }) {}
}
export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: string }) {}
}

// create user
export class CreateUser implements Action {
  readonly type = UserActionTypes.CreateUser;
  constructor(public payload?: { data: IUser[] }) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UserActionTypes.CreateUserSuccess;
  constructor(public payload?: { data: IUser[] }) {}
}

// update user
export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor(public payload?: { id: number, data: IUser[] }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserSuccess;
  constructor(public payload?: { id: number, data: IUser[] }) {}
}

// delete user
export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;
  constructor(public payload?: { id: number}) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor(public payload?: { id: number}) {}
}

export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFailure
  | CreateUser
  | CreateUserSuccess
  | UpdateUser
  | UpdateUserSuccess
  | DeleteUser
  | DeleteUserSuccess;
