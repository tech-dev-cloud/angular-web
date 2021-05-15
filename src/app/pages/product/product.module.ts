import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'ngx-owl-carousel';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OwlModule,
    ComponentsModule,
    RouterModule.forChild([
      // {path:"", component:ProductComponent},
      // {path:":category", component:CategoryProductsComponent},
      // {path:":category/:product_id", component:PDPComponent},
    ]),
  ],
  providers: []
})
export class ProductModule { }
