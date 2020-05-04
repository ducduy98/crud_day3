import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Navigate, NAVIGATE, NAVIGATE_BACK, NAVIGATE_FORWARD } from './router.action';

@Injectable()
export class RouterEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(NAVIGATE),
    map((action: Navigate) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      return this.router.navigate(path, { queryParams, ...extras });
    }),
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(NAVIGATE_BACK),
    tap(() => this.location.back()),
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(NAVIGATE_FORWARD),
    tap(() => this.location.forward()),
  );
}
