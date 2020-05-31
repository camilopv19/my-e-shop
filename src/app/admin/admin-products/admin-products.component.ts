import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
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
    this.products$ = productService.getAll().snapshotChanges().pipe(
      map(pr => pr.map(p => {
        return {
          id: p.payload.key,
          title: p.payload.exportVal().title,
          price: p.payload.exportVal().price
        }
      }))
    );

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