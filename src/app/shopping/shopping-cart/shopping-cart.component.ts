import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  cart$;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart(); //No need to unsuscribe 'cause this is a single-time use item thru the entire app
    // this.cart$.subscribe( cart => console.log(cart));
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
