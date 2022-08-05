import { createReducer, On, Action, on } from '@ngrx/store';
import { Register } from '../../modal/new-user';
import { IUser } from '../../modal/user';
import { LoadUsersSuccess, UserActions, UserActionTypes } from '../actions/user.actions';

export const userFeatureKey = 'usersState';

export interface State {
  loading?: boolean;
  loaded?: boolean;
  users?: IUser[];
  error?: string;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  users: [],
  error: '',
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    // load all users
    case UserActionTypes.LoadUsers: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserActionTypes.LoadUsersSuccess: {
      return {
        ...state,
        users: action.payload.data,
        error: '',
      };
    }

    case UserActionTypes.LoadUsersFailure: {
      return {
        ...state,
        users: [],
        error: action.payload.error,
      };
    }

    // add user
    case UserActionTypes.CreateUserSuccess: {
      const users = state.users.concat(action.payload.data)
      return {...state, ...{users}, loading: true, loaded: false};
    }
    
    // Update user
    case UserActionTypes.UpdateUserSuccess: {
      const users = state.users.filter((data) => data.id !== action.payload.id);
      const updateUser = users.concat(action.payload.data)
      return {...state, loading: true, loaded: false, ...{users: updateUser}};
    }

    // Delete User
    case UserActionTypes.DeleteUserSuccess: {
      const users = state.users.filter((data) =>  data.id !== action.payload.id);
      return {
        ...state, 
        users: [...users] 
      };
    }

    default:
      return state;
  }
}
