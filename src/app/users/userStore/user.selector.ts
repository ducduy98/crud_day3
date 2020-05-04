import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from "./user.reducer";
export const getUsersState = createFeatureSelector<UserState>(
    'users',
);

export const selectUsersList = createSelector(
    getUsersState,
    state => state.users
);

export const selectUser = createSelector(
    getUsersState,
    state => state.user
);

export const selectUserErrors = createSelector(
    getUsersState,
    state => state.errors
);
