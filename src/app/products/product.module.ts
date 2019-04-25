import { NgModule } from '@angular/core';

import { ProductDetailComponent } from '../product-details/product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';

import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from '../product-details/product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,

  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
         canActivate: [ProductDetailGuard],
         component: ProductDetailComponent
      },
      {
        path: 'products/:id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      },
    ]),
    SharedModule
  ]
})
export class ProductModule { }
