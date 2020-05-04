import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router.model';

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
  >('router');
