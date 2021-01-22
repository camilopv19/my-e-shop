import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.ts
// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.html

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: '',
    id: ''
  };           //When the form is initialized with the New Product button, the template will try to read all the props of
  //the 'undefined' object, that's why this is empty at the beggining
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe((p: Product) => this.product = p);
  }

  save(product) {
    //Update - Create
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['admin/products']);
    // this.router.navigateByUrl('products');
  }
  
  delete(){
    if (!confirm('Are you sure?')) return;

    this.productService.delete(this.id)
    this.router.navigate(['admin/products']);
  }

  ngOnInit(): void {
  }

}



