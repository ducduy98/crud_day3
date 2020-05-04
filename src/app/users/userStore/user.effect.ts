import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {UserService} from "../userServices/user.service";
import {Injectable} from "@angular/core";
import * as userActions from './user.action';
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import * as productActions from "../../products/store/product.action";

@Injectable()
export class UserEffects {
    constructor(
        private action$: Actions,
        private router: Router,
        private userService: UserService
    ) {
    }

    loadUsersList$ = createEffect(() =>
        this.action$.pipe(
            ofType(userActions.loadUsersList),
            exhaustMap(() =>
                this.userService.getUsersList().pipe(
                    map(res => userActions.loadUsersListSuccess({users: res})),
                    catchError(error => of(userActions.loadUsersListFail({errors: error})))
                )
            )
        )
    );

    loadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(userActions.loadUser),
            exhaustMap(action  =>
                this.userService.getUserById(action.id).pipe(
                    map(res => userActions.loadUserSuccess({ user: res })),
                    catchError(error => of(userActions.loadUserFail({ errors: error })))
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(userActions.createUser),
            exhaustMap(action =>
                this.userService.addNewUser(action.user).pipe(
                    map(res => {
                        return userActions.createUserSuccess({ user: res })
                        // return productActions.loadProductsList();
                    }),
                    catchError(error => of(userActions.createUserFail({ errors: error })))
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(userActions.updateUser),
            exhaustMap(action =>
                this.userService.updateUser(action.user).pipe(
                    map(res => {
                        return userActions.updateUserSuccess({ user: res })
                        // return productActions.loadProductsList();
                    }),
                    catchError(error => of(userActions.updateUserFail({ errors: error })))
                )
            )
        )
    );

    createUserS$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(userActions.createUser),
                tap((response) => {
                    this.router.navigate(['/users']);
                })
            ),
        { dispatch: false }
    );

    updateUserS$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(userActions.updateUser),
                tap((response) => {
                    this.router.navigate(['/users']);
                })
            ),
        { dispatch: false }
    );


}