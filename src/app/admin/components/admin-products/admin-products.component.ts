import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
// import * as company from 'src/assets/testData/company.json';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$: Observable<any[]>;
  filteredProducts: any[];
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    
    //valueChanges(): Can log all plain products but no metadata
    this.products$ = productService.getAll();

    this.products$.subscribe(
      products => {
        this.filteredProducts = this.products = products;
        // console.log(products);
      }    //Log all plain products, no metadata
    );

    // https://blog.strongbrew.io/thinking-reactively-in-angular-and-rxjs/

  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) 
      : this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.products$.subscribe().unsubscribe();

  }
}