import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$;
  category: string;
  filteredProducts: any[] = [];
  products: Product[] = [];
  cart: any;
  suscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.products$ = productService.getAll();

    this.products$.switchMap(
      products => {
        this.products = products;
        //route.snapshot.queryParamMap... would refresh the page if the URL changes. It only needs to refresh the DOM current elements
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category == this.category) :
          this.products;
      });

  }
  async ngOnInit() {

    this.suscription = (await this.cartService.getCart())
    .subscribe( cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
}
