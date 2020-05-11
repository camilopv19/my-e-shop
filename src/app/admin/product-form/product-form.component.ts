import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable, Subscription } from 'rxjs';

// See implementation example at https://github.com/camilopv19/firebase-demo/blob/master/src/app/app.component.ts

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories = [];
  subscription: Subscription;

  constructor(categoryService: CategoryService) {

    this.subscription = categoryService.getCategories().valueChanges().subscribe(
      values =>{
        this.categories = values;
      }
    );
    
  }

  ngOnInit(): void {
  }

}
