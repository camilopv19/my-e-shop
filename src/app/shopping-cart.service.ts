import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './models/item';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  list: AngularFireList<any>;
  
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() : Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();    
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
    map( (x:ShoppingCart) => new ShoppingCart( x.items ) ));
  }

  private async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }
  
  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);   
  }

  async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    
    item$.valueChanges().pipe(take(1)).subscribe( (item: Item) =>{
       item$.update({ product, quantity: item != null ? item.quantity + change : 1});
      // else this.db.list('/shopping-carts/' + cartId + '/items').set(product.id,{ product, quantity: 1 });
    })
  }
}
