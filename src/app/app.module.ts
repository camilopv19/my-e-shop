import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ValidatorDirective } from './validation-directives/validator.directive';
import { UrlDirective } from './validation-directives/url.directive';


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
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    
    ValidatorDirective,
    UrlDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '',               component: HomeComponent},
      { path: 'login',          component: LoginComponent},
      { path: 'products',       component: ProductsComponent},
      { path: 'shopping-cart',  component: ShoppingCartComponent},

      { path: 'check-out',      component: CheckOutComponent,     canActivate: [AuthGuard]},
      { path: 'order-success',  component: OrderSuccessComponent, canActivate: [AuthGuard]},
      { path: 'my/orders',      component: MyOrdersComponent,     canActivate: [AuthGuard]},
      
      { path: 'admin/products', 
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'admin/orders',   
        component: AdminOrdersComponent,  
        canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'admin/products/new',   
        component: ProductFormComponent,  
        canActivate: [AuthGuard, AdminAuthGuard]}
    ]),
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
