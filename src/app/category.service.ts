import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('categories', (cats) => cats.orderByChild('name')) //Sort
      .snapshotChanges()
      .pipe(map(cats => {
        return cats.map(c => ({ key: c.payload.key, name: c.payload.exportVal().name }))
      }));
  }



}
