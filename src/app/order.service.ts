import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  async placeOder(order) {

    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();

    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges()
    .pipe( map(order => order.map(p => {
        return {
          // orderId: p.payload.key
          datePlaced: p.payload.exportVal().datePlaced,
          items: p.payload.exportVal().items,
          shipping: p.payload.exportVal().shipping,
          userId: p.payload.exportVal().userId
        }
      })));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', (orders) => orders.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe( map(order => order.map(p => {
          return {
            // orderId: p.payload.key
            datePlaced: p.payload.exportVal().datePlaced,
            items: p.payload.exportVal().items,
            shipping: p.payload.exportVal().shipping,
            userId: p.payload.exportVal().userId
          }
        })))
  }
}
