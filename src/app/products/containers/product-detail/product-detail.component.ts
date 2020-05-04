import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {
  createProduct,
  loadProduct,
  ProductState,
  selectProduct,
  updateProduct,
  updateProductSuccess
} from "../../store";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'fis-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  submitted = false;
  title = 'Chi tiết sản phẩm';
  private unsubcribe$ = new Subject<void>();
  product$: Observable<Product>;

  checkExist: boolean;

  productFrom = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productStore: Store<ProductState>,
    private formBuilder: FormBuilder
    ) {}


  ngOnInit(): void {
    this.productFrom = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    const id: any = this.route.snapshot.paramMap.get('productId');
    if(id) {
      this.checkExist = true;
      this.productStore.dispatch(loadProduct({id: id}));
      this.product$ = this.productStore.pipe(select(selectProduct));

      this.product$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if(res) {
          this.productFrom.patchValue(res);
        }
      });

      // this.productService.getProductById(Number(id)).subscribe(res => {
      //   if(res) {
      //     this.productFrom.patchValue(res);
      //   }
      // });
    } else {
      this.checkExist = false;
    }
  }
  onSubmit() {

    this.submitted = true;

    if (this.productFrom.invalid) {
      return;
    }
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productFrom.value, null, 4));
  }
  onSave(form: FormGroup) {
    this.onSubmit();
    if(this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);
    }
  }
  get f() { return this.productFrom.controls; }
  onCreate(form: FormGroup) {
    const { value } = form;
    this.productStore.dispatch(createProduct({product: value}));


    // let result = this.productService.addNewProduct(value);
    // if(result) {
    //   console.log('them moi thanh cong');
    //   this.router.navigateByUrl('/products');
    // } else {
    //   console.log('That bai');
    // }
  }

  onUpdate(form: FormGroup) {
    const { value } = form;
    this.productStore.dispatch(updateProductSuccess({product: value}));

    // let result = this.productService.updateProduct(value);
    // if(result) {
    //   console.log('update thanh cong');
    //   this.router.navigateByUrl('/products');
    // } else {
    //   console.log('That bai');
    // }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
