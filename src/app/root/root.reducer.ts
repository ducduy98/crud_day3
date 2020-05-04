import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from './router';

export interface RootState {
  router: RouterReducerState<RouterStateUrl>;
}

export const rootReducers: ActionReducerMap<RootState> = {
  router: routerReducer,
};
