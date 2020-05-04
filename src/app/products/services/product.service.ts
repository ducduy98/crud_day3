import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private  http: HttpClient) {

  }

  getProductsList(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`/api/products`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`/api/products/${id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addNewProduct(productData: Product): Observable<Product> {
    return this.http
      .post<Product>(`/api/products`, productData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }


  updateProduct(productData: Product): Observable<Product>  {
    return this.http
      .put<Product>(`/api/products/${productData.id}`, productData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  searchProduct(keyword: any): Observable<Product[]> {
    return of(null);
  }
}
