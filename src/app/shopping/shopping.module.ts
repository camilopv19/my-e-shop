import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ProductsFilterComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    RouterModule.forChild([
      { path: 'products',       component: ProductsComponent},
      { path: 'shopping-cart',  component: ShoppingCartComponent},
      { path: 'check-out',      component: CheckOutComponent,     canActivate: [AuthGuard]},
      { path: 'order-success/:id',  component: OrderSuccessComponent, canActivate: [AuthGuard]},
      { path: 'my/orders',      component: MyOrdersComponent,     canActivate: [AuthGuard]},
    ]),

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ShoppingModule { }
