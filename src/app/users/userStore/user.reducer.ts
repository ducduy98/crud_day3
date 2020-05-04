import {User} from "../userModels/user.model";
import {Action, createReducer, on} from "@ngrx/store";

import * as userActions from './user.action';
import * as productActions from "../../products/store/product.action";
import {ProductState} from "../../products/store";
export interface UserState {
    users: User[];
    user: User;
    errors:any;
}
export const initialState: UserState={
    users: [],
    user: null,
    errors:null
}
const userReducer=createReducer(
    initialState,

    //load User List
    on(userActions.loadUsersList,state => ({
        ...state,
        users:[],
        errors:null
    })),
    on(userActions.loadUsersListSuccess, (state, { users}) => ({
        ...state,
        users: users,
        errors: null
    })),
    on(userActions.loadUsersListFail, (state, { errors}) => ({
        ...state,
        errors: errors
    })),
    //end load user List

    //load User
    on(userActions.loadUser,state => ({
        ...state,
        user:null,
        errors:null
    })),
    on(userActions.loadUserSuccess, (state, { user}) => ({
        ...state,
        user: user,
        errors: null
    })),
    on(userActions.loadUserFail, (state, { errors}) => ({
        ...state,
        errors: errors
    })),
    //end load user

    //load  add User
    on(userActions.createUser,state => ({
        ...state,
        errors:null
    })),
    on(userActions.createUserSuccess, (state, { user}) => ({
        ...state,
        users: [...state.users,user],
        errors: null
    })),
    on(userActions.loadUsersListFail, (state, { errors}) => ({
        ...state,
        errors: errors
    })),
    //end add user

    //load update User
    on(userActions.updateUser,state => ({
        ...state,
        errors:null
    })),
    on(userActions.loadUsersListSuccess, (state, { users}) => ({
        ...state,
        // users: users,
        errors: null
    })),
    on(userActions.loadUsersListFail, (state, { errors}) => ({
        ...state,
        errors: errors
    })),
    //end update user

);
export function usersReducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action);
}
