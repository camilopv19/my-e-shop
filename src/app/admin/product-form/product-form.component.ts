import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';

// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.ts
// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.html

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Observable<any[]>;
  subscription: Subscription;

  constructor(categoryService: CategoryService, private productService: ProductService) {

    this.categories = categoryService.getCategories().snapshotChanges().pipe(
      map(cats => {
        return cats.map(c =>
          ({ key: c.payload.key, name: c.payload.exportVal().name })
        )
      })
    );
  }

  save(product) {
    this.productService.create(product);

  }

  ngOnInit(): void {
  }

}
