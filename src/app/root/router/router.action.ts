import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const NAVIGATE = '[Router] Go';
export const NAVIGATE_BACK = '[Router] Back';
export const NAVIGATE_FORWARD = '[Router] Forward';

export class Navigate implements Action {
  readonly type = NAVIGATE;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    },
  ) {}
}

export class NavigateBack implements Action {
  readonly type = NAVIGATE_BACK;
}

export class NavigateForward implements Action {
  readonly type = NAVIGATE_FORWARD;
}

export type RouterAction = Navigate | NavigateBack | NavigateForward;
