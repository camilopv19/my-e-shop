import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.ts
// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.html

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product: ProductInterface ={
    title: '',
    price: null,
    category: '',
    imageUrl: ''};           //When the form is initialized with the New Product button, the template will try to read all the props of
  //the 'undefined' object, that's why this is empty at the beggining

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getCategories().snapshotChanges().pipe(
      map(cats => {
        return cats.map(c =>
          ({ key: c.payload.key, name: c.payload.exportVal().name })
        )
      })
    );

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.get(id).valueChanges().pipe(take(1)).subscribe( (p:ProductInterface) => this.product = p);
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['admin/products']);
    // this.router.navigateByUrl('products');
  }

  ngOnInit(): void {
  }

}

export interface ProductInterface {
  title: String;
  price: Number;
  category: String;
  imageUrl: String;
}

