import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDataTableModule } from 'angular-9-datatable';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDataTableModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    LayoutModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    NgxDataTableModule,
    CommonModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    LayoutModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
