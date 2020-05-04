import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState} from "./product.reducer";

export const getProductsState = createFeatureSelector<ProductState>(
  'products',
);

export const selectProductsList = createSelector(
  getProductsState,
  state => state.products
);

export const selectProduct = createSelector(
  getProductsState,
  state => state.product
);

export const selectProductErrors = createSelector(
  getProductsState,
  state => state.errors
);
