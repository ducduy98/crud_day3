import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
// pages
import * as fromUserComponents from './userComponents';

// Components
import * as fromUserContainers from './userContainers';

import {UserService} from "./userServices/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {usersReducer} from "./userStore/user.reducer";
import {UserEffects} from "./userStore/user.effect";

@NgModule({
  declarations: [
      ...fromUserComponents.componentsUser,
      ...fromUserContainers.containersUser,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,

      StoreModule.forFeature('users', usersReducer),
      EffectsModule.forFeature([UserEffects]),
  ],
    providers: [
        UserService
    ]

})

export class UsersModule { }
