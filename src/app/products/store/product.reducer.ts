import { Action, createReducer, on } from '@ngrx/store';
import * as productActions from './product.action';
import {Product} from "../models/product.model";
import * as _ from 'lodash';

export interface ProductState {
  products: Product[];
  product: Product;
  errors: any;
}

export const initialState: ProductState = {
  products: [],
  product: null,
  errors: null
};

const productReducer = createReducer(
  initialState,

  /***************** Load products ****************/
  on(productActions.loadProductsList, state => ({
    ...state,
    products: [],
    errors: null
  })),

  on(productActions.loadProductsListSuccess, (state, { products}) => ({
    ...state,
    products: products,
    errors: null
  })),

  on(productActions.loadProductsListFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Load products ****************/

  /***************** Load product ****************/
  on(productActions.loadProduct, state => ({
    ...state,
    product: null,
    errors: null
  })),

  on(productActions.loadProductSuccess, (state, { product}) => ({
    ...state,
    product: product,
    errors: null
  })),

  on(productActions.loadProductFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Load product ****************/

  /***************** Create product ****************/
  on(productActions.createProduct, state => ({
    ...state,
    errors: null
  })),

  on(productActions.createProductSuccess, (state, { product}) => ({
    ...state,
    products: [...state.products, product],
    errors: null
  })),

  on(productActions.createProductFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Create product ****************/

  /***************** Update product ****************/
  on(productActions.updateProduct, state => ({
    ...state,
    errors: null
  })),

  on(productActions.updateProductSuccess, (state, { product}) => ({
    ...state,
    products: Object.assign(
      product,
      state.products.splice(_.findIndex(state.products, {id: product.id}), 1, product)),
    // products:[[...state.product.id],product],
    
    errors: null
  })),

  on(productActions.updateProductFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Update product ****************/

);

export function productsReducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
