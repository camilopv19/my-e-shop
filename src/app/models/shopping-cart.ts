import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    shoppingCartItemsCount: number;
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: ShoppingCartItem[]) {
      for (let pId in itemsMap){
        let item = itemsMap[pId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }      
    }

    // get productIds(){
    //   return Object.keys(this.itemsMap); 
    // // Didn't need to 'cause the annotation in the map method on the service did the trick
    // }

    get totalItemCount(){
      let count = 0;

      for (let productId in this.itemsMap)
        {count += this.itemsMap[productId].quantity;}
      
        return count;
    };

    get total(){
      let total = 0;
      this.items.forEach(item => total += item.totalPrice); 
        return total;
    };
}
