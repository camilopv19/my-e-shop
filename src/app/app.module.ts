import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDataTableModule } from 'angular-9-datatable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AdminModule } from './admin/admin.module';

import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuardService as AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UrlDirective } from './validation-directives/url.directive';
import { ValidatorDirective } from './validation-directives/validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ProductsFilterComponent,
    
    ValidatorDirective,
    UrlDirective,
    ProductsFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    FormsModule,
    BrowserModule,
    NgxDataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '',               component: ProductsComponent},
      { path: 'login',          component: LoginComponent},
      { path: 'products',       component: ProductsComponent},
      { path: 'shopping-cart',  component: ShoppingCartComponent},

      { path: 'check-out',      component: CheckOutComponent,     canActivate: [AuthGuard]},
      { path: 'order-success/:id',  component: OrderSuccessComponent, canActivate: [AuthGuard]},
      { path: 'my/orders',      component: MyOrdersComponent,     canActivate: [AuthGuard]},
      
      { path: 'admin/orders',   
      component: AdminOrdersComponent,  
      canActivate: [AuthGuard, AdminAuthGuard]},
      
      { path: 'admin/products/new',   
      component: ProductFormComponent,  
      canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'admin/products/:id',   
      component: ProductFormComponent,  
      canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'admin/products', 
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]}
    ]),
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
