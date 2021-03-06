import { ShoppingCart } from "./shopping-cart";

export class Order{
    datePlaced: number;
    items: any[];

    constructor(
        public userId: string,
        public shipping: any,
        cart: ShoppingCart,
    ){
        this.datePlaced = new Date().getTime();
        this.items =  cart.items.map(i => {
            return {
              product: {
                title: i.title,
                image: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }
}