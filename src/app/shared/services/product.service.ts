import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('products').push(product);
  }

  getAll() {
    return this.db.list('products').snapshotChanges().pipe(
      map(pr => pr.map(p => {
        return {
          id: p.payload.key,
          title: p.payload.exportVal().title,
          price: p.payload.exportVal().price,
          imageUrl: p.payload.exportVal().imageUrl,
          category: p.payload.exportVal().category
        }
      }))
    );
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).set(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
