import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
import { AdminAuthGuardService as AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { UrlDirective } from './validation-directives/url.directive';
import { ValidatorDirective } from './validation-directives/validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ValidatorDirective,
    UrlDirective,
  ],
  imports: [
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }
    ]),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
