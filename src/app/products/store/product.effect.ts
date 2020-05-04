import {Injectable} from "@angular/core";
import {ProductService} from "../services/product.service";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as productActions from './product.action';
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private productService: ProductService
  ) {
  }

  loadProductsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProductsList),
      exhaustMap(()  =>
        this.productService.getProductsList().pipe(
          map(res => productActions.loadProductsListSuccess({ products: res })),
          catchError(error => of(productActions.loadProductsListFailed({ errors: error })))
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProduct),
      exhaustMap(action  =>
        this.productService.getProductById(action.id).pipe(
          map(res => productActions.loadProductSuccess({ product: res })),
          catchError(error => of(productActions.loadProductFailed({ errors: error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.createProduct),
      exhaustMap(action =>
        this.productService.addNewProduct(action.product).pipe(
          map(res => {
            return productActions.createProductSuccess({ product: res })
            // return productActions.loadProductsList();
          }),
          catchError(error => of(productActions.createProductFailed({ errors: error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.updateProduct),
      exhaustMap(action =>
        this.productService.updateProduct(action.product).pipe(
          map(res => {
            return productActions.updateProductSuccess({ product: res })
            // return productActions.loadProductsList();
          }),
          catchError(error => of(productActions.updateProductFailed({ errors: error })))
        )
      )
    )
  );

  createProductS$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(productActions.createProductSuccess),
        tap((response) => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );

  updateProductS$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(productActions.updateProductSuccess),
        tap((response) => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );

}
