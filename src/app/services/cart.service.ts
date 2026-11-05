import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly productAddedSubject = new Subject<Product>();
  readonly productAdded$ = this.productAddedSubject.asObservable();

  addProduct(product: Product): void {
    this.productAddedSubject.next(product);
  }
}
