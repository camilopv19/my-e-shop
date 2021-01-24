import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{

  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }



}
