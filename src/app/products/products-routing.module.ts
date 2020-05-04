import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent, ProductDetailComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products-list'
  },
  {
    path: 'products-list',
    component: ProductsListComponent
  },
  {
    path: 'create',
    component: ProductDetailComponent
  },
  {
    path: ':productId',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
