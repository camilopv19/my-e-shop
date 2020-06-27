import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  category: string;
  filteredProducts: any[] = [];
  products: Product[] = [];

  constructor(
    route: ActivatedRoute,
    productService: ProductService
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

    // this.products$.subscribe(
    //   products => {
    //     this.products = products;

    //     //route.snapshot.queryParamMap... would refresh the page if the URL changes. It only needs to refresh the DOM current elements
    //     route.queryParamMap.subscribe(params => {
    //       this.category = params.get('category');

    //       this.filteredProducts = (this.category) ?
    //         this.products.filter(p => p.category == this.category) :
    //         this.products;
    //     });
    //   }
    // );

    
  }

}
