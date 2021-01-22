import { Product } from './product';
import { ShoppingCart } from './shopping-cart';

export class ShoppingCartItem {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    
    constructor(init?: Partial<ShoppingCartItem>){       //init could be an object that "looks" like ShoppingCart
        Object.assign(this, init);
     }  
    get totalPrice(){ return this.price * this.quantity; }
}
