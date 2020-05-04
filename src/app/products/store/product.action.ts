import { createAction, props } from '@ngrx/store';
import {Product} from "../models/product.model";

/**************  Load products ***************/
export const loadProductsList = createAction(
  '[Products List Page] Load Products List'
);

export const loadProductsListSuccess = createAction(
  '[Products List API] Load Products List Success',
  props<{ products: Product[] }>()
);

export const loadProductsListFailed = createAction(
  '[Products List API] Load Products List Failed',
  props<{ errors: any }>()
);
/**************  End: Load products ***************/

/**************  Load product ***************/
export const loadProduct = createAction(
  '[Products Page] Load Product',
  props<{ id: number }>()
);

export const loadProductSuccess = createAction(
  '[Products API] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductFailed = createAction(
  '[Products API] Load Product Failed',
  props<{ errors: any }>()
);
/**************  End: Load product ***************/

/**************  Create product ***************/
export const createProduct = createAction(
  '[CreateProduct Page] Create Product',
  props<{product: Product}>()
);

export const createProductSuccess = createAction(
  '[Products API] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFailed = createAction(
  '[Products API] Create Product Failed',
  props<{ errors: any }>()
);
/**************  End: Create product ***************/

/**************  Update product ***************/
export const updateProduct = createAction(
  '[UpdateProduct Page] Update Product',
  props<{product: Product}>()
);

export const updateProductSuccess = createAction(
  '[Products API] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailed = createAction(
  '[Products API] Update Product Failed',
  props<{ errors: any }>()
);
/**************  End: Update product ***************/
