import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import {select, Store} from "@ngrx/store";
import {loadProductsList, ProductState, selectProductErrors, selectProductsList} from "../../store";

@Component({
  selector: 'fis-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnChanges {

  title = 'Danh sách sản phẩm';

  productsList$: Observable<Product[]>;
  errors$: Observable<any>;

  constructor(
    private productStore: Store<ProductState>
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.onGetProductList();
  }

  ngOnInit(): void {
    this.productStore.dispatch(loadProductsList());

    // Get products from store
    this.productsList$ = this.productStore.pipe(select(selectProductsList));
    this.errors$ = this.productStore.pipe(select(selectProductErrors));
  }



  onSearch(keyword: any) {
    // if(keyword && keyword.length > 0) {
    //   this.productsList$ = this.productService.searchProduct(keyword);
    // } else {
    //   this.onGetProductList();
    // }
    //
  }
}
