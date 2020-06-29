import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  isCollapsed = true;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart();

  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.auth.logout();
    this.toggle();
    this.router.navigate(['/login']);
  }
}
