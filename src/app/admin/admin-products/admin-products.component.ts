import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
products$: Observable<any[]>;

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
      
      // this.products$.subscribe(
      //   p => console.log(p)    //Log all plain products, no metadata
      // );

      // https://blog.strongbrew.io/thinking-reactively-in-angular-and-rxjs/
   }

   
   
   ngOnInit() {
  }

}

