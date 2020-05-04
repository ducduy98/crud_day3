import {createAction, props} from "@ngrx/store";
import {User} from "../userModels/user.model";



// Load Users//

export const loadUsersList = createAction(
    '[Users List Page] Load User List'
);

export const loadUsersListSuccess = createAction(
    '[Users List Page Api] Load User List Success',
    props<{ users: User[] }>()
);

export const loadUsersListFail = createAction(
    '[Users List Page Api] Load User List Fail',
    props<{ errors: any }>()
);

// End Load UserList

//Load an User

export const loadUser = createAction(
    '[User Page] Load User',
    props<{ id: number }>()
);

export const loadUserSuccess = createAction(
    '[User Api] Load User Success',
    props<{ user: User }>()
);

export const loadUserFail = createAction(
    '[User Api] Load User Fail',
    props<{ errors: any }>()
);


//Create an User

export const createUser = createAction(
    '[CreateUser Page] Create User',
    props<{ user: User }>()
);

export const createUserSuccess = createAction(
    '[CreateUser Page] Create User Success',
    props<{ user: User }>()
);

export const createUserFail = createAction(
    '[CreateUser Page] Create User Fail',
    props<{ errors: any }>()
);

//END CREATE USER


// Update an User

export const updateUser = createAction(
    '[updateUser Page] Create User',
    props<{ user: User }>()
);

export const updateUserSuccess = createAction(
    '[updateUser Page] Update User Success',
    props<{ user: User }>()
);

export const updateUserFail = createAction(
    '[updateUser Page] Update User Fail',
    props<{ errors: any }>()
);

//END UPDATE USER



