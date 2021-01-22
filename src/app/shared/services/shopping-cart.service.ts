import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

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

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }
  
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);   
  }

  async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    
    item$.valueChanges().pipe(take(1)).subscribe( (item: Item) =>{
      let quantity = item != null ? item.quantity + change : 1;
      if(quantity === 0) item$.remove();
      else item$.update({ 
         title: product.title,
         imageUrl: product.imageUrl,
         price: product.price,
         quantity: quantity});
    })
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
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

}
