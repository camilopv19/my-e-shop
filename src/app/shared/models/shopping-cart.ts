import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    shoppingCartItemsCount: number;
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: ShoppingCartItem[]) {
      this.itemsMap = itemsMap || [];
      for (let pId in itemsMap){
        let item = itemsMap[pId];
        this.items.push(new ShoppingCartItem({ ...item, id: pId}));
      }      
    }

    getQuantity(product: Product) {
      // console.log(product);
      
      let item = this.itemsMap[product.id]
      return item ? item.quantity : 0;
    }
    

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
