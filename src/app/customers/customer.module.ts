import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'customers', component: CustomersComponent },
    ]),
    SharedModule
  ]
})
export class CustomerModule { }
