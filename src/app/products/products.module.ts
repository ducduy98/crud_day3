import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

// pages
import * as fromPages from './containers';

// Components
import * as fromComponents from './components';

import { ProductService } from './services/product.service';
import {StoreModule} from "@ngrx/store";
import {ProductsEffects, productsReducer} from "./store";
import {EffectsModule} from "@ngrx/effects";



@NgModule({
  declarations: [
    ...fromPages.containers,
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,

    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
